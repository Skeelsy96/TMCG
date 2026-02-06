import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const datasets = [
      {
        package_type: 'compact',
        items: [
          'VW Caddy',
          'Peugeot Partner',
          'Renault Kangoo',
          'Suzuki APV',
          'Holden Combo',
          'Ford Transit Connect',
        ],
      },
      {
        package_type: 'large',
        items: [
          'LDV G10+',
          'Toyota HiAce',
          'Mercedes Vito',
          'VW Transporter',
          'Ford Transit Custom',
          'Renault Trafic',
          'Hyundai i-Load',
        ],
      },
      {
        package_type: 'walk_in',
        items: [
          'Iveco Daily',
          'Mercedes Sprinter',
          'VW Crafter',
          'Ford Transit',
          'Renault Master',
          'Fiat Ducato',
          'LDV Deliver 9',
        ],
      },
    ];

    const results = [];

    for (const ds of datasets) {
      let created = 0;
      let skipped = 0;
      for (let i = 0; i < ds.items.length; i++) {
        const name = ds.items[i];
        const existing = await base44.asServiceRole.entities.VanModel.filter(
          { name, package_type: ds.package_type },
          '-created_date',
          1
        );
        if (existing && existing.length > 0) {
          skipped += 1;
          continue;
        }
        await base44.asServiceRole.entities.VanModel.create({
          name,
          package_type: ds.package_type,
          is_active: true,
          order: i,
        });
        created += 1;
      }
      results.push({ package_type: ds.package_type, created, skipped, total: ds.items.length });
    }

    return Response.json({ success: true, results });
  } catch (error) {
    return Response.json({ error: error?.message || String(error) }, { status: 500 });
  }
});