import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const VAN_OPTIONS = [
  {
    id: 'compact-suv',
    name: 'Compact SUV',
    baseModel: 'Mitsubishi Outlander / Nissan X-Trail',
    dimensions: { width: 1.8, length: 2.5 },
    price: '65,000',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/220ee09c6_SUV7.jpg',
    features: ['50-100 coffees/day', 'Perfect for tight spaces', 'Low running costs']
  },
  {
    id: 'large-van',
    name: 'Large Van',
    baseModel: 'Mercedes Sprinter / Ford Transit',
    dimensions: { width: 2.0, length: 4.0 },
    price: '145,000',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/1460956e5_ServeFromRearVans7.png',
    features: ['150-300 coffees/day', 'Multi-barista setup', 'Event ready']
  },
  {
    id: 'walk-in',
    name: 'Walk-In Van',
    baseModel: 'Large Box Truck',
    dimensions: { width: 2.4, length: 5.0 },
    price: '195,000',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/062a79d1b_ProductionFit-out4.jpg',
    features: ['300+ coffees/day', 'Full interior access', 'Premium events']
  }
];

export default function VanSelector({ configuration, updateConfiguration }) {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-black mb-4">Choose Your Base Van</h2>
        <p className="text-[#333333] text-lg max-w-2xl mx-auto">
          Select the van size that best suits your business goals and target market
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {VAN_OPTIONS.map((van, index) => (
          <motion.button
            key={van.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => updateConfiguration('vanModel', van)}
            className={`relative bg-white rounded-2xl overflow-hidden border-2 transition-all text-left ${
              configuration.vanModel?.id === van.id
                ? 'border-[#FDD202] shadow-xl'
                : 'border-[#DBDBDB] hover:border-[#969696]'
            }`}
          >
            {configuration.vanModel?.id === van.id && (
              <div className="absolute top-4 right-4 w-10 h-10 bg-[#FDD202] rounded-full flex items-center justify-center z-10">
                <Check className="w-6 h-6 text-black" />
              </div>
            )}

            <div className="relative h-48">
              <img
                src={van.image}
                alt={van.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white mb-1">{van.name}</h3>
                <p className="text-white/90 text-sm">{van.baseModel}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <div className="text-3xl font-bold text-black mb-1">
                  ${van.price}
                  <span className="text-sm text-[#969696] font-normal ml-2">+ GST</span>
                </div>
                <div className="text-sm text-[#969696]">
                  Interior: {van.dimensions.width}m × {van.dimensions.length}m
                </div>
              </div>

              <ul className="space-y-2">
                {van.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-[#333333]">
                    <Check className="w-4 h-4 text-[#FDD202] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.button>
        ))}
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