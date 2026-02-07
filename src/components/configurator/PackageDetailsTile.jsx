import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

const VAN_ID_TO_TYPE = {
  'Compact-Van': 'compact',
  'Large-Van': 'large',
  'Walk-In Van': 'walk_in',
};

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

  return (
    <div className="rounded-xl border border-[#DBDBDB] bg-white p-4">
      {loading ? (
        <div className="text-sm text-[#969696]">Loading package details…</div>
      ) : items.length === 0 ? (
        <div className="text-sm text-[#969696]">No details available.</div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1 text-sm">
          {items.map((inc) => (
            <li key={inc.id} className="flex items-start gap-2 leading-tight">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FDD202] flex-shrink-0" />
              <span className="text-[#333333]">{inc.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}