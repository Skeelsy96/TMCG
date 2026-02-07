import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const TEMPLATE_SPREADSHEET_ID = '1zUeMHGZptYyxFmfAgzxsK2NQMWOh9sJH4XH4Qd_Nnqg';
const TEMPLATE_SHEET_ID = 982186800; // from gid

// Headers for the raw data sheet (ordered)
const RAW_HEADERS = [
  'Timestamp', 'Source Page URL',
  'UTM Source', 'UTM Medium', 'UTM Campaign',
  'First Name', 'Last Name', 'Full Name',
  'Email', 'Mobile', 'State & Suburb', 'Best Date/Time',
  'Budget', 'Funding', 'Timeframe', 'Journey Progress', 'Van Style',
  'Main Reason', 'Income Goal', 'Travel Preference', 'Boss Excitement', 'Free Time Activity',
  'Existing Vans Count', 'Existing Business Time',
  'Specific Questions', 'Anything Else', 'Extra Resources',
  'Configuration ID', 'All Responses JSON'
];

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
  flat.submitted_from = submission.submittedFrom || submission.pageUrl || submission.sourceUrl || '';
  flat.utm_source = submission?.utmParams?.source || '';
  flat.utm_medium = submission?.utmParams?.medium || '';
  flat.utm_campaign = submission?.utmParams?.campaign || '';
  if (Array.isArray(submission.extraResources)) {
    flat.extraResources = submission.extraResources.join(', ');
  }
  flat.configuration_id = submission.configId || submission.configurationId || '';
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
  // Try to read existing RAW config
  const existing = await base44.asServiceRole.entities.RawLeadSheetConfig.list();
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
        name: 'TMCG Leads Raw',
        mimeType: 'application/vnd.google-apps.spreadsheet'
      })
    }
  );
  const spreadsheetId = createdFile.id;

  // Sheets token
  const sheetsToken = await base44.asServiceRole.connectors.getAccessToken('googlesheets');
  const sheetTitle = 'Sheet1';

  // Write RAW headers to row 1
  await googleFetch(
    sheetsToken,
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetTitle)}!A1:1?valueInputOption=USER_ENTERED`,
    { method: 'PUT', body: JSON.stringify({ range: `${sheetTitle}!A1:1`, values: [RAW_HEADERS] }) }
  );

  // Save RAW config
  const saved = await base44.asServiceRole.entities.RawLeadSheetConfig.create({
    spreadsheet_id: spreadsheetId,
    sheet_title: sheetTitle,
  });
  return saved;
}

async function appendLeadRow(base44, submission) {
  const token = await base44.asServiceRole.connectors.getAccessToken('googlesheets');
  const cfg = await ensureSheet(base44);

  const flat = flattenSubmission(submission);

  // Mapping helper for common fields
  const get = (keys = []) => {
    for (const k of keys) {
      if (submission && Object.prototype.hasOwnProperty.call(submission, k) && submission[k] != null) return submission[k];
      if (flat && Object.prototype.hasOwnProperty.call(flat, k) && flat[k] != null) return flat[k];
    }
    return '';
  };

  const row = [
    get(['timestamp', 'submittedAt']),
    get(['submitted_from', 'pageUrl', 'sourceUrl']),
    get(['utm_source']), get(['utm_medium']), get(['utm_campaign']),
    get(['firstName']), get(['lastName']), get(['name', 'fullName']),
    get(['email']), get(['mobile', 'phone', 'phoneNumber']), get(['stateSuburb']), get(['bestDateTime']),
    get(['budget']), get(['funding']), get(['timeframe']), get(['journeyProgress', 'journey']), get(['vanStyle']),
    get(['mainReason']), get(['incomeGoal']), get(['travelPreference']), get(['bossExcitement']), get(['freeTimeActivity']),
    get(['existingVansCount', 'existingVans']), get(['existingBusinessTime']),
    get(['specificQuestions']), get(['anythingElse']), get(['extraResources']),
    get(['configuration_id', 'configId', 'configurationId']), get(['allresponsesjson'])
  ];

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