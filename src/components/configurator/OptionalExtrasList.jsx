import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

export default function OptionalExtrasList({ configuration, updateConfiguration }) {
  const [extras, setExtras] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!configuration?.vanModel?.id) { setExtras([]); return; }
      setLoading(true);
      try {
        const list = await base44.entities.VanFitOutOptionalExtrasList.list();
        const filtered = list.filter((e) => Array.isArray(e.references) && e.references.length > 0
          ? e.references.includes(configuration.vanModel.id)
          : true);
        if (active) setExtras(filtered);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [configuration?.vanModel?.id]);

  const selected = Array.isArray(configuration?.optionalExtras) ? configuration.optionalExtras : [];
  const isChecked = (extra) => selected.some((x) => (x.id && x.id === extra.id) || x.name === extra.name);

  const toggleExtra = (extra) => {
    const exists = isChecked(extra);
    const next = exists ? selected.filter((x) => !((x.id && x.id === extra.id) || x.name === extra.name)) : [...selected, extra];
    updateConfiguration('optionalExtras', next);
  };

  return (
    <div className="rounded-xl border border-[#DBDBDB] bg-white p-4">
      {loading ? (
        <div className="text-sm text-[#969696]">Loading extras…</div>
      ) : extras.length === 0 ? (
        <div className="text-sm text-[#969696]">No optional extras available for this package.</div>
      ) : (
        <ul className="space-y-3">
          {extras.map((extra) => (
            <li key={extra.id || extra.name} className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={isChecked(extra)}
                  onChange={() => toggleExtra(extra)}
                />
                <span className="text-black">{extra.name}</span>
              </label>
              {typeof extra.price_aud === 'number' && (
                <span className="font-semibold text-black">${extra.price_aud.toLocaleString()}</span>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 text-[10px] text-[#969696]">Selected extras are included in the estimate.</div>
    </div>
  );
}