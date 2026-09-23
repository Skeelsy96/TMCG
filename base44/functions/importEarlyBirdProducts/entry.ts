import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

// Import Early Bird products from a Google Sheet into EarlyBirdProducts entity
// Expected Sheet columns (header row):
// name, category, description, full_description, image, gallery_images, tasting_notes, ingredients,
// size_option_1_size, size_option_1_price, size_option_2_size, size_option_2_price, size_option_3_size, size_option_3_price,
// featured, in_stock
//
// Notes:
// - gallery_images: comma-separated URLs
// - tasting_notes: comma-separated values
// - featured/in_stock: TRUE/FALSE or 1/0
// - category must be one of: Coffee, Chai, Hot Chocolate, Syrup, Equipment, Supplies
//
// Request payload JSON:
// {
//   "spreadsheetId": "<ID>",
//   "sheetName": "Products",        // optional, defaults to 'Products'
//   "mode": "upsert" | "replace"    // optional, defaults to 'upsert'; 'replace' clears existing then inserts
// }

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Admin-only import to prevent accidental bulk changes
    if (user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { spreadsheetId, sheetName = 'Products', mode = 'upsert' } = await req.json();
    if (!spreadsheetId) {
      return Response.json({ error: 'Missing spreadsheetId' }, { status: 400 });
    }

    // Get OAuth access token for Google Sheets (already authorized in this app)
    const accessToken = await base44.asServiceRole.connectors.getAccessToken('googlesheets');
    if (!accessToken) {
      return Response.json({ error: 'Google Sheets connector not authorized' }, { status: 400 });
    }

    // Fetch sheet values
    const range = encodeURIComponent(`${sheetName}!A:Z`);
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?majorDimension=ROWS`;
    const gsResp = await fetch(sheetsUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!gsResp.ok) {
      const t = await gsResp.text();
      return Response.json({ error: 'Failed to fetch Google Sheet', details: t }, { status: 400 });
    }

    const data = await gsResp.json();
    const rows = data.values || [];
    if (rows.length < 2) {
      return Response.json({ error: 'Sheet has no data rows' }, { status: 400 });
    }

    const headers = rows[0].map((h) => String(h || '').trim());

    const idx = (key) => headers.indexOf(key);
    const iName = idx('name');
    const iCategory = idx('category');
    const iDescription = idx('description');
    const iFullDesc = idx('full_description');
    const iImage = idx('image');
    const iGallery = idx('gallery_images');
    const iTasting = idx('tasting_notes');
    const iIngredients = idx('ingredients');
    const iFeat = idx('featured');
    const iStock = idx('in_stock');

    const sizeCols = [
      { s: idx('size_option_1_size'), p: idx('size_option_1_price') },
      { s: idx('size_option_2_size'), p: idx('size_option_2_price') },
      { s: idx('size_option_3_size'), p: idx('size_option_3_price') },
    ];

    const toBool = (v) => {
      const s = String(v || '').trim().toLowerCase();
      return s === 'true' || s === '1' || s === 'yes' || s === 'y';
    };

    let cleared = false;
    if (mode === 'replace') {
      // Delete all existing products (service role)
      const existing = await base44.asServiceRole.entities.EarlyBirdProducts.list();
      if (Array.isArray(existing) && existing.length) {
        // Delete one by one to respect RLS and avoid payload limits
        for (const item of existing) {
          await base44.asServiceRole.entities.EarlyBirdProducts.delete(item.id);
        }
        cleared = true;
      }
    }

    const results = { created: 0, updated: 0, skipped: 0, cleared };

    // Process each data row
    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      const name = iName >= 0 ? (row[iName] || '').trim() : '';
      if (!name) { results.skipped++; continue; }

      const category = iCategory >= 0 ? (row[iCategory] || '').trim() : '';
      const description = iDescription >= 0 ? (row[iDescription] || '').trim() : '';
      const full_description = iFullDesc >= 0 ? (row[iFullDesc] || '').trim() : '';
      const image = iImage >= 0 ? (row[iImage] || '').trim() : '';

      const gallery_images = iGallery >= 0 && row[iGallery]
        ? String(row[iGallery]).split(',').map((s) => s.trim()).filter(Boolean)
        : [];

      const tasting_notes = iTasting >= 0 && row[iTasting]
        ? String(row[iTasting]).split(',').map((s) => s.trim()).filter(Boolean)
        : [];

      const ingredients = iIngredients >= 0 ? (row[iIngredients] || '').trim() : '';

      const size_options = [];
      for (const sc of sizeCols) {
        const size = sc.s >= 0 ? (row[sc.s] || '').trim() : '';
        const priceRaw = sc.p >= 0 ? (row[sc.p] || '').toString().trim() : '';
        if (size && priceRaw) {
          const price = Number(priceRaw.replace(/[^0-9.\-]/g, ''));
          if (!Number.isNaN(price)) size_options.push({ size, price });
        }
      }

      const featured = iFeat >= 0 ? toBool(row[iFeat]) : false;
      const in_stock = iStock >= 0 ? toBool(row[iStock]) : true;

      const payload = {
        name,
        category,
        description,
        full_description,
        image,
        gallery_images,
        tasting_notes,
        ingredients,
        size_options,
        featured,
        in_stock,
      };

      // Upsert by name (service role to ensure consistency during bulk import)
      const existing = await base44.asServiceRole.entities.EarlyBirdProducts.filter({ name });
      if (Array.isArray(existing) && existing.length > 0) {
        const current = existing[0];
        await base44.asServiceRole.entities.EarlyBirdProducts.update(current.id, payload);
        results.updated++;
      } else {
        await base44.asServiceRole.entities.EarlyBirdProducts.create(payload);
        results.created++;
      }
    }

    return Response.json({ status: 'success', results });
  } catch (error) {
    return Response.json({ error: error.message || String(error) }, { status: 500 });
  }
});