import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const TEMPLATE_SPREADSHEET_ID = '1zUeMHGZptYyxFmfAgzxsK2NQMWOh9sJH4XH4Qd_Nnqg';
const TEMPLATE_SHEET_ID = 982186800; // from gid

function normalizeKey(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '') // remove non-alphanumerics
    .trim();
}

function flattenSubmission(submission) {
  const flat = { ...submission };
  // Derived fields
  flat.name = [submission.firstName, submission.lastName].filter(Boolean).join(' ').trim();
  flat.timestamp = submission.submittedAt;
  flat.utm_source = submission?.utmParams?.source || '';
  flat.utm_medium = submission?.utmParams?.medium || '';
  flat.utm_campaign = submission?.utmParams?.campaign || '';
  if (Array.isArray(submission.extraResources)) {
    flat.extraResources = submission.extraResources.join(', ');
  }
  // Provide a full JSON dump as well
  flat.allresponsesjson = JSON.stringify(submission);
  return flat;
}

async function googleFetch(token, url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google API error ${res.status}: ${text}`);
  }
  return res.json();
}

async function ensureSheet(base44) {
  // Try to read existing config
  const existing = await base44.asServiceRole.entities.LeadSheetConfig.list();
  if (existing && existing.length > 0) {
    return existing[0];
  }

  // Create a new Google Spreadsheet (owned by app)
  const driveToken = await base44.asServiceRole.connectors.getAccessToken('googledrive');
  const createdFile = await googleFetch(
    driveToken,
    'https://www.googleapis.com/drive/v3/files',
    {
      method: 'POST',
      body: JSON.stringify({
        name: 'TMCG Leads',
        mimeType: 'application/vnd.google-apps.spreadsheet'
      })
    }
  );
  const spreadsheetId = createdFile.id;

  // Sheets token
  const sheetsToken = await base44.asServiceRole.connectors.getAccessToken('googlesheets');

  // Read template sheet title and header row from the provided example (programmatic recreation)
  const templateMeta = await googleFetch(
    sheetsToken,
    `https://sheets.googleapis.com/v4/spreadsheets/${TEMPLATE_SPREADSHEET_ID}?fields=sheets.properties(sheetId%2Ctitle)`
  );
  const tplSheet = (templateMeta.sheets || []).find(s => s.properties.sheetId === TEMPLATE_SHEET_ID) || (templateMeta.sheets || [])[0];
  const tplTitle = tplSheet?.properties?.title || 'Leads';

  const headerResp = await googleFetch(
    sheetsToken,
    `https://sheets.googleapis.com/v4/spreadsheets/${TEMPLATE_SPREADSHEET_ID}/values/${encodeURIComponent(tplTitle)}!1:1`
  );
  const headers = (headerResp.values && headerResp.values[0]) || [];

  // Rename first sheet, freeze header, header styling, wrap, autosize
  const baseRequests = [
    {
      updateSheetProperties: {
        properties: { sheetId: 0, title: tplTitle, gridProperties: { frozenRowCount: 1 } },
        fields: 'title,gridProperties.frozenRowCount'
      }
    },
    {
      repeatCell: {
        range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
        cell: {
          userEnteredFormat: {
            textFormat: { bold: true },
            backgroundColor: { red: 0.95, green: 0.95, blue: 0.95 },
            wrapStrategy: 'WRAP'
          }
        },
        fields: 'userEnteredFormat(textFormat,backgroundColor,wrapStrategy)'
      }
    },
    {
      autoResizeDimensions: {
        dimensions: { sheetId: 0, dimension: 'COLUMNS', startIndex: 0, endIndex: Math.max(1, headers.length) }
      }
    },
    {
      repeatCell: {
        range: { sheetId: 0, startRowIndex: 1, endRowIndex: 2000 },
        cell: { userEnteredFormat: { wrapStrategy: 'WRAP' } },
        fields: 'userEnteredFormat.wrapStrategy'
      }
    }
  ];

  // Try to read simple ONE_OF_LIST data validations from the template's second row and apply to whole columns in new sheet
  let validationRequests = [];
  try {
    const tplGrid = await googleFetch(
      sheetsToken,
      `https://sheets.googleapis.com/v4/spreadsheets/${TEMPLATE_SPREADSHEET_ID}?includeGridData=true&fields=sheets(properties(sheetId%2Ctitle)%2Cdata(rowData(values(dataValidation))))`
    );
    const tplGridSheet = (tplGrid.sheets || []).find(s => s.properties.sheetId === TEMPLATE_SHEET_ID) || (tplGrid.sheets || [])[0];
    const firstDataRow = tplGridSheet?.data?.[0]?.rowData?.[1]?.values || []; // row index 1 => row 2

    headers.forEach((_, c) => {
      const v = firstDataRow[c];
      if (v && v.dataValidation && v.dataValidation.condition && v.dataValidation.condition.type === 'ONE_OF_LIST') {
        validationRequests.push({
          repeatCell: {
            range: { sheetId: 0, startRowIndex: 1, endRowIndex: 2000, startColumnIndex: c, endColumnIndex: c + 1 },
            cell: { dataValidation: v.dataValidation },
            fields: 'dataValidation'
          }
        });
      }
    });
  } catch (_) {
    // If reading validations fails, continue with base formatting only
  }

  // Number formats for common columns if present
  const findCol = (label) => headers.findIndex(h => normalizeKey(h) === normalizeKey(label));
  const numFormat = (col, format) => ({
    repeatCell: {
      range: { sheetId: 0, startRowIndex: 1, endRowIndex: 2000, startColumnIndex: col, endColumnIndex: col + 1 },
      cell: { userEnteredFormat: { numberFormat: format } },
      fields: 'userEnteredFormat.numberFormat'
    }
  });

  const tsIdx = findCol('Timestamp');
  const budgetIdx = findCol('Budget');
  const vansIdx = findCol('Existing Vans Count');
  const jsonIdx = findCol('All Responses JSON');

  const formatRequests = [];
  if (tsIdx >= 0) formatRequests.push(numFormat(tsIdx, { type: 'DATE_TIME' }));
  if (budgetIdx >= 0) formatRequests.push(numFormat(budgetIdx, { type: 'NUMBER', pattern: '"$"#,##0.00' }));
  if (vansIdx >= 0) formatRequests.push(numFormat(vansIdx, { type: 'NUMBER', pattern: '0' }));
  if (jsonIdx >= 0) {
    formatRequests.push({
      repeatCell: {
        range: { sheetId: 0, startRowIndex: 1, endRowIndex: 2000, startColumnIndex: jsonIdx, endColumnIndex: jsonIdx + 1 },
        cell: { userEnteredFormat: { wrapStrategy: 'WRAP' } },
        fields: 'userEnteredFormat.wrapStrategy'
      }
    });
  }

  // Apply all formatting requests
  const allRequests = [...baseRequests, ...validationRequests, ...formatRequests];
  if (allRequests.length) {
    await googleFetch(
      sheetsToken,
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
      { method: 'POST', body: JSON.stringify({ requests: allRequests }) }
    );
  }

  // Write header values exactly as template (programmatic recreation)
  await googleFetch(
    sheetsToken,
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tplTitle)}!A1:1?valueInputOption=USER_ENTERED`,
    { method: 'PUT', body: JSON.stringify({ range: `${tplTitle}!A1:1`, values: [headers] }) }
  );

  // Save config
  const saved = await base44.asServiceRole.entities.LeadSheetConfig.create({
    spreadsheet_id: spreadsheetId,
    sheet_title: tplTitle,
  });
  return saved;
}

async function appendLeadRow(base44, submission) {
  const token = await base44.asServiceRole.connectors.getAccessToken('googlesheets');
  const cfg = await ensureSheet(base44);

  // Fetch header row from the target sheet (row 1)
  const headerResp = await googleFetch(
    token,
    `https://sheets.googleapis.com/v4/spreadsheets/${cfg.spreadsheet_id}/values/${encodeURIComponent(cfg.sheet_title)}!1:1`
  );
  const headers = (headerResp.values && headerResp.values[0]) || [];

  const flat = flattenSubmission(submission);

  // Build row to match headers by normalized keys
  const row = headers.map(h => {
    const key = normalizeKey(h);
    // Common synonyms mapping
    const map = {
      phone: 'mobile',
      mobilenumber: 'mobile',
      mobile: 'mobile',
      fullname: 'name',
      name: 'name',
      firstname: 'firstName',
      lastname: 'lastName',
      email: 'email',
      state: 'stateSuburb',
      suburb: 'stateSuburb',
      statesuburb: 'stateSuburb',
      bestdatetime: 'bestDateTime',
      timestamp: 'timestamp',
      utmsource: 'utm_source',
      utmmedium: 'utm_medium',
      utmcampaign: 'utm_campaign',
      allresponsesjson: 'allresponsesjson'
    };

    const targetField = map[key] || key; // try direct match first

    // Prefer exact field name if exists in original submission
    if (submission.hasOwnProperty(targetField)) return submission[targetField];

    // Then check our flattened dictionary
    if (flat.hasOwnProperty(targetField)) return flat[targetField];

    // Finally try camelCase to normalized match
    const byNorm = Object.entries(flat).find(([k]) => normalizeKey(k) === key);
    return byNorm ? byNorm[1] : '';
  });

  // Append the row
  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${cfg.spreadsheet_id}/values/${encodeURIComponent(cfg.sheet_title)}!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  await googleFetch(token, appendUrl, {
    method: 'POST',
    body: JSON.stringify({ values: [row] })
  });

  return { success: true, spreadsheet_id: cfg.spreadsheet_id };
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    // Not strictly required for public form, but ensures rate-limiting per user if logged in
    await base44.auth.isAuthenticated();

    const { action = 'submit', submission } = await req.json().catch(() => ({ action: 'submit', submission: null }));

    if (action === 'init') {
      const cfg = await ensureSheet(base44);
      return Response.json({ success: true, config: cfg });
    }

    if (!submission) {
      return Response.json({ error: 'Missing submission' }, { status: 400 });
    }

    const result = await appendLeadRow(base44, submission);
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});