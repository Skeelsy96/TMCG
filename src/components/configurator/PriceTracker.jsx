import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PriceTracker({ configuration }) {
  const calculateBreakdown = () => {
    const breakdown = {
      base: 0,
      materials: 0,
      branding: 0,
      items: []
    };

    // Base van price
    if (configuration.vanModel) {
      const basePrice = parseFloat(configuration.vanModel.price.replace(/,/g, ''));
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
      className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl border-2 border-[#FDD202] p-6 w-96 z-40"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#FDD202] rounded-full flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-black" />
        </div>
        <div>
          <div className="text-sm text-[#969696]">Estimated Total</div>
          <div className="text-3xl font-bold text-black">
            ${breakdown.total.toLocaleString()}
          </div>
        </div>
      </div>

      {breakdown.items.length > 0 && (
        <div className="border-t border-[#DBDBDB] pt-4 space-y-2">
          {breakdown.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-[#333333]">{item.name}</span>
              <span className="font-semibold text-black">
                ${item.price.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-[#DBDBDB] text-xs text-[#969696]">
        <TrendingUp className="w-4 h-4 inline mr-1" />
        Excludes GST • Final quote may vary
      </div>
    </motion.div>
  );
}