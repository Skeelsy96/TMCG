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

  // 1) Create a blank Google Spreadsheet via Drive (drive.file scope allows creating app-owned files)
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

  // 2) Use the default first tab name without extra API calls
  const sheetsToken = await base44.asServiceRole.connectors.getAccessToken('googlesheets');
  const sheetTitle = 'Sheet1';

  // 3) Write header row to match form fields + tracking
  const headers = [
    'Timestamp','First Name','Last Name','Name','Email','Mobile','State & Suburb','Best Date/Time','Submitted From',
    'UTM Source','UTM Medium','UTM Campaign',
    'Main Reason','Income Goal','Travel Preference','Boss Excitement','Free Time Activity','Existing Vans Count','Existing Business Time',
    'Journey Progress','Van Style','Specific Questions','Timeframe','Budget','Funding','Anything Else','Extra Resources','Configuration ID','All Responses JSON'
  ];
  await googleFetch(
    sheetsToken,
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetTitle)}!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      body: JSON.stringify({ values: [headers] })
    }
  );

  // 4) Save config
  const saved = await base44.asServiceRole.entities.LeadSheetConfig.create({
    spreadsheet_id: spreadsheetId,
    sheet_title: sheetTitle,
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