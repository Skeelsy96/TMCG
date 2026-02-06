import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });

    const summary = { merges: {}, deletions: {} };

    // 1) Ensure CoffeeVan -> PreLovedVanListings migration ran (safe to re-run)
    try {
      await base44.functions.invoke('migrateCoffeeVans', {});
      summary.merges.migrateCoffeeVans = 'invoked';
    } catch (e) {
      summary.merges.migrateCoffeeVans = `skip_or_error: ${e?.message || e}`;
    }

    // 2) Merge NewVanModels -> VanModel (dedupe by name+package_type)
    try {
      const oldModels = await base44.asServiceRole.entities.NewVanModels.list();
      let created = 0, skipped = 0;
      for (let i = 0; i < oldModels.length; i++) {
        const m = oldModels[i];
        const name = m.name;
        const pkg = m.package_type || m.package || null;
        if (!name || !pkg) { skipped++; continue; }
        const existing = await base44.asServiceRole.entities.VanModel.filter({ name, package_type: pkg }, '-created_date', 1);
        if (existing && existing.length > 0) { skipped++; continue; }
        await base44.asServiceRole.entities.VanModel.create({
          name,
          package_type: pkg,
          is_active: true,
          order: typeof m.order === 'number' ? m.order : i
        });
        created++;
      }
      summary.merges.NewVanModels_to_VanModel = { created, skipped, total: oldModels.length };
    } catch (e) {
      summary.merges.NewVanModels_to_VanModel = { error: e?.message || String(e) };
    }

    // 3) Merge NewVanImages -> VanConfiguratorImagesList (dedupe by name)
    try {
      const oldImgs = await base44.asServiceRole.entities.NewVanImages.list();
      let created = 0, skipped = 0;
      for (let i = 0; i < oldImgs.length; i++) {
        const img = oldImgs[i];
        const name = img.name;
        if (!name) { skipped++; continue; }
        const existing = await base44.asServiceRole.entities.VanConfiguratorImagesList.filter({ name }, '-created_date', 1);
        if (existing && existing.length > 0) { skipped++; continue; }
        await base44.asServiceRole.entities.VanConfiguratorImagesList.create({
          name,
          references: img.references || [],
          notes: img.notes || ''
        });
        created++;
      }
      summary.merges.NewVanImages_to_VanConfiguratorImagesList = { created, skipped, total: oldImgs.length };
    } catch (e) {
      summary.merges.NewVanImages_to_VanConfiguratorImagesList = { error: e?.message || String(e) };
    }

    // 4) Delete legacy entity data (after merges)
    const legacyEntities = [
      'CoffeeVan',
      'CoffeeVanImage',
      'ListingPackage',
      'NewVanModels',
      'EventPosting',
      'Event',
      'OperatorProfile',
      'OperatorApplication',
      'PlatformFeedback',
      'Product',
      'Order',
      'NewVanImages'
    ];

    for (const entityName of legacyEntities) {
      try {
        const items = await base44.asServiceRole.entities[entityName]?.list?.() || [];
        let deleted = 0;
        for (const item of items) {
          await base44.asServiceRole.entities[entityName].delete(item.id);
          deleted++;
        }
        summary.deletions[entityName] = { deleted };
      } catch (e) {
        summary.deletions[entityName] = { error: e?.message || String(e) };
      }
    }

    return Response.json({ success: true, summary });
  } catch (error) {
    return Response.json({ error: error?.message || String(error) }, { status: 500 });
  }
});