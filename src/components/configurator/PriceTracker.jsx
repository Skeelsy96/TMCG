import React, { useEffect, useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

export default function PriceTracker({ configuration }) {
  const [basePriceEntity, setBasePriceEntity] = useState(null);
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (!configuration?.vanModel?.id) { if (active) setBasePriceEntity(null); return; }
        const list = await base44.entities.VanFitOutPriceList.list();
        const rec = list.find(r => (r.van_id || r.code || r.name) === configuration.vanModel.id);
        if (active) setBasePriceEntity(typeof rec?.base_price_aud === 'number' ? rec.base_price_aud : null);
      } catch {}
    })();
    return () => { active = false; };
  }, [configuration?.vanModel?.id]);
  const calculateBreakdown = () => {
    const breakdown = {
      base: 0,
      materials: 0,
      branding: 0,
      items: []
    };

    // Base van price
    if (configuration.vanModel) {
      const parsed = configuration.vanModel.price ? parseFloat(String(configuration.vanModel.price).replace(/,/g, '')) : 0;
      const basePrice = typeof basePriceEntity === 'number' ? basePriceEntity : (configuration.vanModel.base_price_aud ?? parsed);
      breakdown.base = basePrice;
      breakdown.items.push({
        name: `${configuration.vanModel.name} Base Package`,
        price: basePrice
      });
    }

    // Materials
    if (configuration.materials?.benchtop === 'timber') {
      breakdown.materials += 1500;
      breakdown.items.push({ name: 'Timber Benchtop Upgrade', price: 1500 });
    }
    if (configuration.materials?.benchtop === 'black-granite') {
      breakdown.materials += 2500;
      breakdown.items.push({ name: 'Black Granite Benchtop', price: 2500 });
    }
    if (configuration.materials?.cabinetry === 'timber') {
      breakdown.materials += 800;
      breakdown.items.push({ name: 'Timber Veneer Cabinetry', price: 800 });
    }
    if (configuration.materials?.cabinetry === 'navy') {
      breakdown.materials += 500;
      breakdown.items.push({ name: 'Navy Blue Cabinetry', price: 500 });
    }
    if (configuration.materials?.flooring === 'timber-look') {
      breakdown.materials += 400;
      breakdown.items.push({ name: 'Timber-Look Flooring', price: 400 });
    }
    if (configuration.materials?.flooring === 'non-slip-checker') {
      breakdown.materials += 800;
      breakdown.items.push({ name: 'Non-Slip Checker Plate', price: 800 });
    }

    // Branding
    if (configuration.branding?.logoPosition === 'wrap') {
      breakdown.branding += 3500;
      breakdown.items.push({ name: 'Full Vehicle Wrap', price: 3500 });
    }

    breakdown.total = breakdown.base + breakdown.materials + breakdown.branding;

    return breakdown;
  };

  const breakdown = calculateBreakdown();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-20 right-4 bg-white rounded-xl shadow-xl border border-[#FDD202] p-4 w-72 z-40"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 bg-[#FDD202] rounded-full flex items-center justify-center">
          <DollarSign className="w-4 h-4 text-black" />
        </div>
        <div>
          <div className="text-xs text-[#969696]">Estimated Total</div>
          <div className="text-2xl font-bold text-black leading-none">
            ${breakdown.total.toLocaleString()}
          </div>
        </div>
      </div>

      {breakdown.items.length > 0 && (
        <div className="border-t border-[#DBDBDB] pt-2 space-y-1 max-h-40 overflow-auto">
          {breakdown.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="flex justify-between items-center text-xs"
            >
              <span className="text-[#333333] line-clamp-1">{item.name}</span>
              <span className="font-semibold text-black">
                ${item.price.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-2 pt-2 border-t border-[#DBDBDB] text-[10px] text-[#969696]">
        <TrendingUp className="w-3 h-3 inline mr-1" />
        Excludes GST • Final quote may vary
      </div>
    </motion.div>
  );
}