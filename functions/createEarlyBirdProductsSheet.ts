import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import * as XLSX from 'npm:xlsx@0.18.5';

function pickImageUrl(name, map) {
  const n = (name || '').toLowerCase();
  if (n.includes('alpha')) return map.alpha;
  if (n.includes('honeycomb')) return map.honeycomb;
  if (n.includes('vibe')) return map.vibe;
  if (n.includes('apron')) return map.apron;
  if (n.includes('barista')) return map.baristaKit;
  if (n.includes('cup')) return map.cups;
  return map.logo;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const xlsxUrl = body.xlsxUrl;
    const title = body.title || 'Early Bird Products (Auto)';

    const defaultImageMap = {
      alpha: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/32087e9f5_Alpha.jpeg',
      honeycomb: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/ecf27c61a_Honeycomb.jpeg',
      vibe: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/9a52da08e_Vibe.jpeg',
      cups: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/2b963f6ed_CoffeeCup.png',
      apron: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/a0b57fc7e_EarlyBirdApron.png',
      baristaKit: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/d6ceb78c8_BaristaKit.png',
      logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/39de7f188_EarlyBirdLogo.jpeg',
    };
    const imageMap = { ...defaultImageMap, ...(body.imageMap || {}) };

    if (!xlsxUrl) {
      return Response.json({ error: 'Missing xlsxUrl' }, { status: 400 });
    }

    // 1) Download and parse XLSX
    const fileRes = await fetch(xlsxUrl);
    if (!fileRes.ok) {
      return Response.json({ error: `Failed to download XLSX (${fileRes.status})` }, { status: 400 });
    }
    const buf = await fileRes.arrayBuffer();
    const wb = XLSX.read(new Uint8Array(buf), { type: 'array' });
    const firstSheetName = wb.SheetNames[0];
    const ws = wb.Sheets[firstSheetName];
    const json = XLSX.utils.sheet_to_json(ws, { defval: '' });

    // Normalize headers
    const headers = ['Product Name', 'Description', 'Quantities Available', 'Price', 'Image'];
    const values = [headers];
    for (const row of json) {
      const name = row['Product Name'] || row['product name'] || row['Name'] || '';
      const desc = row['Description'] || '';
      const qty = row['Quantities Available'] || row['Quantities'] || '';
      const price = row['Price'] || '';
      const providedImg = row['Image'] || '';
      const img = providedImg && String(providedImg).trim().length > 0
        ? String(providedImg)
        : pickImageUrl(name, imageMap);
      values.push([name, desc, qty, price, img]);
    }

    // 2) Create spreadsheet
    const sheetsToken = await base44.asServiceRole.connectors.getAccessToken('googlesheets');
    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sheetsToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: { title },
        sheets: [{ properties: { title: 'Product List' } }],
      }),
    });
    if (!createRes.ok) {
      const t = await createRes.text();
      return Response.json({ error: 'Failed to create spreadsheet', details: t }, { status: 500 });
    }
    const created = await createRes.json();
    const spreadsheetId = created.spreadsheetId;

    // 3) Write data
    const range = `Product List!A1:E${values.length}`;
    const writeRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=RAW`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${sheetsToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values }),
    });
    if (!writeRes.ok) {
      const t = await writeRes.text();
      return Response.json({ error: 'Failed to write values', details: t }, { status: 500 });
    }

    // 4) Make it shareable (anyone with link - reader)
    const driveToken = await base44.asServiceRole.connectors.getAccessToken('googledrive');
    const permRes = await fetch(`https://www.googleapis.com/drive/v3/files/${spreadsheetId}/permissions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${driveToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: 'reader', type: 'anyone', allowFileDiscovery: false }),
    });
    if (!permRes.ok) {
      const t = await permRes.text();
      return Response.json({ error: 'Created sheet but failed to set sharing', sheetId: spreadsheetId, details: t }, { status: 500 });
    }

    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=0`;
    return Response.json({ spreadsheetId, url, rows: values.length - 1 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});