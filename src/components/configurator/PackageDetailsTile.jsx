import React, { useEffect, useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';

const VAN_ID_TO_TYPE = {
  'Compact-Van': 'compact',
  'Large-Van': 'large',
  'Walk-In Van': 'walk_in',
};

const CATEGORY_LABELS = {
  appliances: 'Appliances and Accessories',
  power: 'Power System',
  water_waste: 'Water and Waste',
  barista_kit: 'Barista Kit Including:',
};

const STATIC_SECTIONS = [
  {
    key: 'interior_customisation',
    title: 'Interior Customisation Options',
    items: [
      'Alu-panel Design Options - Splash back',
      'Powder Coated or Painted - Colour of choice',
      'or',
      'Vinyl Wrapped - Design of choice',
    ],
  },
  {
    key: 'internal_light_options',
    title: 'Internal Light Options',
    items: [
      '(2x) LED Downlights - optional vintage bulbs',
      'or',
      'LED Strip lighting',
    ],
  },
  {
    key: 'bench_top_options',
    title: 'Bench Top Options',
    items: [
      'Stainless-Steel bench top',
      'or',
      'Timber bench top',
    ],
  },
];

export default function PackageDetailsTile({ vanModelId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!vanModelId) { setItems([]); return; }
      setLoading(true);
      try {
        const vanType = VAN_ID_TO_TYPE[vanModelId] || null;
        const list = vanType
          ? await base44.entities.VanFitOutInclusionsList.filter({ van_type: vanType })
          : await base44.entities.VanFitOutInclusionsList.list();
        if (active) setItems(Array.isArray(list) ? list : []);
      } catch {
        if (active) setItems([]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [vanModelId]);

  const grouped = useMemo(() => {
    const g = { appliances: [], power: [], water_waste: [], barista_kit: [] };
    items.forEach((i) => { if (g[i.category]) g[i.category].push(i); });
    return g;
  }, [items]);

  return (
    <div className="rounded-xl border border-[#DBDBDB] bg-white p-4">
      {loading ? (
        <div className="text-sm text-[#969696]">Loading package details…</div>
      ) : items.length === 0 ? (
        <div className="text-sm text-[#969696]">No details available.</div>
      ) : (
        <div className="space-y-6">
          {/* Appliances and Accessories (from DB) */}
          {grouped.appliances.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-black mb-2">{CATEGORY_LABELS.appliances}</h3>
              <ul className="space-y-2 text-sm">
                {grouped.appliances.map((inc) => (
                  <li key={inc.id} className="flex items-start gap-2 leading-tight">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FDD202] flex-shrink-0" />
                    <span className="text-[#333333]">{inc.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Static sections to match original structure */}
          {STATIC_SECTIONS.map((section) => (
            <div key={section.key}>
              <h3 className="text-sm font-semibold text-black mb-2">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.items.map((txt, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-tight">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FDD202] flex-shrink-0" />
                    <span className="text-[#333333]">{txt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Power System (from DB) */}
          {grouped.power.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-black mb-2">{CATEGORY_LABELS.power}</h3>
              <ul className="space-y-2 text-sm">
                {grouped.power.map((inc) => (
                  <li key={inc.id} className="flex items-start gap-2 leading-tight">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FDD202] flex-shrink-0" />
                    <span className="text-[#333333]">{inc.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Water and Waste (from DB) */}
          {grouped.water_waste.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-black mb-2">{CATEGORY_LABELS.water_waste}</h3>
              <ul className="space-y-2 text-sm">
                {grouped.water_waste.map((inc) => (
                  <li key={inc.id} className="flex items-start gap-2 leading-tight">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FDD202] flex-shrink-0" />
                    <span className="text-[#333333]">{inc.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Barista Kit (from DB) */}
          {grouped.barista_kit.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-black mb-2">{CATEGORY_LABELS.barista_kit}</h3>
              <ul className="space-y-2 text-sm">
                {grouped.barista_kit.map((inc) => (
                  <li key={inc.id} className="flex items-start gap-2 leading-tight">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FDD202] flex-shrink-0" />
                    <span className="text-[#333333]">{inc.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}