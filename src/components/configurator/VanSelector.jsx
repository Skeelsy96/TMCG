import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

function currencyAud(n) {
  if (typeof n !== 'number') return '';
  try { return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n); } catch { return `$${n}`; }
}

function getSpec(map, key) { return map[key]; }
function buildSpecMap(specs = []) {
  const map = {};
  specs.forEach(s => { if (s?.key) map[s.key] = s; });
  return map;
}

export default function VanSelector({ configuration, updateConfiguration }) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const list = await base44.entities.VanModel.filter({ is_active: true }, 'order', 100);
      if (mounted) {
        setModels(list);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-[#969696]">Loading available vans…</div>
    );
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-black mb-4">Choose Your Base Van</h2>
        <p className="text-[#333333] text-lg max-w-2xl mx-auto">
          Select the exact model to drive pricing, dimensions and allowed layouts
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {models.map((m, index) => {
          const specs = buildSpecMap(m?.comparison?.specifications);
          const widthMm = getSpec(specs, 'interior_width_mm')?.numeric_value;
          const lengthMm = getSpec(specs, 'interior_length_mm')?.numeric_value;
          const widthM = typeof widthMm === 'number' ? (widthMm / 1000).toFixed(2) : null;
          const lengthM = typeof lengthMm === 'number' ? (lengthMm / 1000).toFixed(2) : null;
          const price = m?.comparison?.pricing?.base_from_aud;

          return (
            <motion.button
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => updateConfiguration('vanModel', m)}
              className={`relative bg-white rounded-2xl overflow-hidden border-2 transition-all text-left ${
                configuration.vanModel?.id === m.id
                  ? 'border-[#FDD202] shadow-xl scale-[1.02]'
                  : 'border-[#DBDBDB] hover:border-[#969696]'
              }`}
            >
              {configuration.vanModel?.id === m.id && (
                <div className="absolute top-4 right-4 w-10 h-10 bg-[#FDD202] rounded-full flex items-center justify-center z-10">
                  <Check className="w-6 h-6 text-black" />
                </div>
              )}

              <div className="relative h-64">
                {m.image_url && (
                  <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-3xl font-bold text-white mb-1">{m.name}</h3>
                  <div className="text-white/90 text-sm flex gap-2 items-center">
                    <span className="px-2 py-0.5 bg-[#FDD202] text-black rounded">{(m.package_type || '').replace('_',' ')}</span>
                    {m.fit_out_style && (
                      <span className="px-2 py-0.5 bg-white/20 text-white rounded">{m.fit_out_style.replaceAll('_',' ')}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-black mb-1">
                    {price ? currencyAud(price) : ''}
                    {price && <span className="text-sm text-[#969696] font-normal ml-2">+ GST</span>}
                  </div>
                  {(widthM || lengthM) && (
                    <div className="text-sm text-[#969696]">
                      Interior: {widthM || '—'}m × {lengthM || '—'}m
                    </div>
                  )}
                </div>

                {(m.comparison?.features || []).length > 0 && (
                  <ul className="space-y-2">
                    {(m.comparison.features || []).slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-base text-[#333333]">
                        <Check className="w-4 h-4 text-[#FDD202] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {configuration.vanModel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-black">
                {configuration.vanModel.name} Selected
              </h3>
              <p className="text-sm text-[#333333]">
                Continue to design your layout
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}