import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const DATA = {
  compact: {
    appliances: [
      'Carimali Nimble 2-Group Commercial Coffee Machine',
      'Carimali XO21 Automatic Commercial Grinder',
      '198L 2 Door Display Fridge',
      '70L Drawer Fridge',
      'Fridge Dividers',
      'Cake & Muffin Display',
      '3 x Spring Loaded Cup Dispensers',
      'Lid Holders',
      'Syrup Holders',
      'Paper Towel Rack & Dispenser',
      'Soap Dispenser',
      'All Hoses, Clamps, Fixtures & Fittings',
      'Fire Extinguisher'
    ],
    power: [
      '5000 Watt 48V Victron Inverter',
      '3 x 100 Amp Hour 48V Lithium-ion Battery',
      'Battery Monitor',
      'Electrical Certificate',
      'Tagging of Appliances',
      'External Power Inlet for Mains Supply',
      'External Power Lead',
      'All Associated Wiring of Appliances'
    ],
    water_waste: [
      'Hot/Cold Water System',
      'Fresh Water Tank (106L)',
      'Hot/Cold Hand Wash Sink with Sensor Tap',
      'Hot/Cold Utensils Sink with Flick Mixer',
      'Jug Rinser',
      'Water Filter',
      'Water Pump',
      'Water Accumulator',
      'External Water Inlet',
      'Waste/Sullage Tank (50L)',
      'Associated Plumbing of Appliances'
    ],
    barista_kit: [
      '3 x 1L Milk Jugs',
      'Chocolate Shaker',
      'Commercial Grade Tamp',
      'Barista Training Videos',
      'Quick Step Barista Guide and Drinks Menu',
      'TMCG Business Starter Pack'
    ]
  },
  large: {
    appliances: [
      'Carimali Nimble 2-Group Commercial Coffee Machine',
      'Carimali XO21 Automatic Commercial Grinder',
      '198L 2 Door Display Fridge',
      '70L Drawer Fridge',
      'Fridge Dividers',
      'Cake & Muffin Display',
      '3 x Spring Loaded Cup Dispensers',
      'Lid Holders',
      'Syrup Holders',
      'Paper Towel Rack & Dispenser',
      'Soap Dispenser',
      'All Hoses, Clamps, Fixtures & Fittings',
      'Fire Extinguisher'
    ],
    power: [
      '5000 Watt 48V Victron Inverter',
      '3 x 100 Amp Hour 48V Lithium-ion Battery',
      'Battery Monitor',
      'Electrical Certificate',
      'Tagging of Appliances',
      'External Power Inlet for Mains Supply',
      'External Power Lead',
      'All Associated Wiring of Appliances'
    ],
    water_waste: [
      'Hot/Cold Water System',
      'Fresh Water Tank (106L)',
      'Hot/Cold Hand Wash Sink with Sensor Tap',
      'Hot/Cold Utensils Sink with Flick Mixer',
      'Jug Rinser',
      'Water Filter',
      'Water Pump',
      'Water Accumulator',
      'External Water Inlet',
      'Waste/Sullage Tank (50L)',
      'Associated Plumbing of Appliances'
    ],
    barista_kit: [
      '3 x 1L Milk Jugs',
      'Chocolate Shaker',
      'Commercial Grade Tamp',
      'Barista Training Videos',
      'Quick Step Barista Guide and Drinks Menu',
      'TMCG Business Starter Pack'
    ]
  },
  walk_in: {
    appliances: [
      'Carimali Nimble 2-Group Commercial Coffee Machine',
      'Carimali XO21 Automatic Commercial Grinder',
      'Schmick 70L Single Door Fridge',
      '198L 2 Door Display Fridge',
      'Fridge Dividers',
      '2 x Under Counter Display Units',
      '3 x Spring Loaded Cup Dispensers',
      'Lid Holders',
      'Syrup Holders',
      'Paper Towel Rack / Dispenser',
      'Soap Dispenser',
      'Roof Extraction Fan - Including Turbo Vent',
      'Lockable Cash Till',
      'Knock Box',
      'All Hoses, Clamps, Fixtures & Fittings',
      'Fire Extinguisher'
    ],
    power: [
      '5000 Watt 48V Victron Inverter',
      '3 x 100 Amp Hour 48V Lithium-ion Battery',
      'Battery Monitor',
      'Electrical Certificate',
      'Tagging of Appliances',
      'External Power Inlet for Mains Supply',
      'External Power Lead',
      'All Associated Wiring of Appliances'
    ],
    water_waste: [
      'Hot/Cold Water System',
      'Fresh Water Tank (106L)',
      'Hot/Cold Hand Wash Sink with Sensor Tap',
      'Hot/Cold Utensils Sink with Flick Mixer',
      'Jug Rinser',
      'Water Filter',
      'Water Pump',
      'Water Accumulator',
      'External Water Inlet',
      'Waste/Sullage Tank (50L)',
      'Associated Plumbing of Appliances'
    ],
    barista_kit: [
      '3 x 1L Milk Jugs',
      'Chocolate Shaker',
      'Commercial Grade Tamp',
      'Barista Training Videos',
      'Quick Step Barista Guide and Drinks Menu',
      'TMCG Business Starter Pack'
    ]
  }
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { van_type } = await req.json().catch(() => ({ van_type: null }));

    const typesToSeed = van_type ? [van_type] : Object.keys(DATA);

    const results = {};
    for (const t of typesToSeed) {
      const existing = await base44.entities.VanFitOutInclusionsList.filter({ van_type: t }, 'name', 1000);
      if (existing.length > 0) {
        results[t] = { skipped: true, existing: existing.length };
        continue;
      }
      const payload = [];
      const sections = DATA[t];
      Object.entries(sections).forEach(([category, items]) => {
        items.forEach((name) => payload.push({ name, van_type: t, category }));
      });

      // Bulk create if available, fallback to loop
      if (base44.entities.VanFitOutInclusionsList.bulkCreate) {
        await base44.entities.VanFitOutInclusionsList.bulkCreate(payload);
      } else {
        for (const rec of payload) {
          await base44.entities.VanFitOutInclusionsList.create(rec);
        }
      }
      results[t] = { created: payload.length };
    }

    return Response.json({ success: true, results });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});