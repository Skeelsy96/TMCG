import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

function guessCategory(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('blend') || n.includes('coffee')) return 'Coffee';
  if (n.includes('kit')) return 'Equipment';
  if (n.includes('cup') || n.includes('apron')) return 'Supplies';
  return 'Supplies';
}

function parsePrices(str) {
  if (!str) return [];
  const lines = String(str).split(/\r?\n/).filter(Boolean);
  const out = [];
  for (const line of lines) {
    // Examples: "5kg = $199.99"  or  "100 = $9.99"
    const m = line.match(/^(.*?)\s*=\s*\$?\s*([0-9]+(?:\.[0-9]+)?)/);
    if (m) {
      const size = m[1].trim();
      const price = Number(m[2]);
      if (!Number.isNaN(price)) out.push({ size, price });
    }
  }
  return out;
}

const DEFAULT_IMAGE_MAP = {
  alpha: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/32087e9f5_Alpha.jpeg',
  honeycomb: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/ecf27c61a_Honeycomb.jpeg',
  vibe: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/9a52da08e_Vibe.jpeg',
  cups: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/2b963f6ed_CoffeeCup.png',
  apron: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/a0b57fc7e_EarlyBirdApron.png',
  baristakit: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/d6ceb78c8_BaristaKit.png',
  logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/39de7f188_EarlyBirdLogo.jpeg',
};

function fallbackImage(name, map = DEFAULT_IMAGE_MAP) {
  const n = (name || '').toLowerCase();
  if (n.includes('alpha')) return map.alpha;
  if (n.includes('honey')) return map.honeycomb;
  if (n.includes('vibe')) return map.vibe;
  if (n.includes('apron')) return map.apron;
  if (n.includes('kit')) return map.baristakit;
  if (n.includes('cup')) return map.cups;
  return map.logo;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await req.json().catch(() => ({}));
    const fileUrl = payload.file_url; // required
    const mode = payload.mode || 'replace'; // 'replace' | 'append'
    const imageMap = { ...DEFAULT_IMAGE_MAP, ...(payload.image_map || {}) };

    if (!fileUrl) return Response.json({ error: 'file_url is required' }, { status: 400 });

    // Use built-in extractor to parse XLSX rows
    const schema = {
      type: 'object',
      properties: {
        'Product Name': { type: 'string' },
        'Description': { type: 'string' },
        'Quantities Available': { type: 'string' },
        'Price': { type: 'string' },
        'Image': { type: 'string' },
      },
      required: ['Product Name'],
    };

    const res = await base44.asServiceRole.integrations.Core.ExtractDataFromUploadedFile({
      file_url: fileUrl,
      json_schema: schema,
    });

    if (res.status !== 'success' || !Array.isArray(res.output)) {
      return Response.json({ error: 'Failed to extract data', details: res.details || null }, { status: 400 });
    }

    const rows = res.output;

    // Optionally clear existing products
    if (mode === 'replace') {
      const existing = await base44.asServiceRole.entities.EarlyBirdProducts.list();
      for (const item of existing) {
        await base44.asServiceRole.entities.EarlyBirdProducts.delete(item.id);
      }
    }

    // Transform rows -> EarlyBirdProducts schema
    const toCreate = [];
    for (const r of rows) {
      const name = r['Product Name']?.toString().trim();
      if (!name) continue;
      const description = r['Description']?.toString() || '';
      const priceStr = r['Price']?.toString() || '';
      const size_options = parsePrices(priceStr);
      const image = (r['Image'] && String(r['Image']).trim()) || fallbackImage(name, imageMap);
      const category = guessCategory(name);

      toCreate.push({
        name,
        description,
        full_description: description,
        category,
        image,
        size_options,
        featured: false,
        in_stock: true,
      });
    }

    if (toCreate.length === 0) return Response.json({ imported: 0, message: 'No rows found' });

    await base44.asServiceRole.entities.EarlyBirdProducts.bulkCreate(toCreate);

    return Response.json({ imported: toCreate.length, mode });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});