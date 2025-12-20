import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const BENCHTOP_OPTIONS = [
  {
    id: 'stainless-steel',
    name: 'Stainless Steel',
    description: 'Professional, durable, easy to clean',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop',
    price: 0,
  },
  {
    id: 'timber',
    name: 'Timber Benchtop',
    description: 'Warm, natural aesthetic',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&h=300&fit=crop',
    price: 1500,
  },
  {
    id: 'black-granite',
    name: 'Black Granite',
    description: 'Premium, heat resistant',
    image: 'https://images.unsplash.com/photo-1615875221248-d6e0a3a66ebb?w=400&h=300&fit=crop',
    price: 2500,
  },
];

const CABINETRY_OPTIONS = [
  { id: 'white', name: 'White', color: '#FFFFFF', price: 0 },
  { id: 'black', name: 'Black', color: '#000000', price: 0 },
  { id: 'grey', name: 'Grey', color: '#808080', price: 0 },
  { id: 'timber', name: 'Timber Veneer', color: '#8B6F47', price: 800 },
  { id: 'navy', name: 'Navy Blue', color: '#001F3F', price: 500 },
];

const FLOORING_OPTIONS = [
  { id: 'vinyl-grey', name: 'Grey Vinyl', price: 0 },
  { id: 'vinyl-black', name: 'Black Vinyl', price: 0 },
  { id: 'timber-look', name: 'Timber-Look Vinyl', price: 400 },
  { id: 'non-slip-checker', name: 'Non-Slip Checker Plate', price: 800 },
];

export default function MaterialsSelector({ configuration, updateConfiguration }) {
  const materials = configuration.materials || {};

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-black mb-4">Choose Materials & Finishes</h2>
        <p className="text-[#333333] text-lg max-w-2xl mx-auto">
          Customize the look and feel of your van interior
        </p>
      </div>

      <div className="space-y-12">
        {/* Benchtop Selection */}
        <div>
          <h3 className="text-xl font-bold text-black mb-6">Benchtop Material</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {BENCHTOP_OPTIONS.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02 }}
                onClick={() =>
                  updateConfiguration('materials', { ...materials, benchtop: option.id })
                }
                className={`relative bg-white rounded-xl overflow-hidden border-2 transition-all text-left ${
                  materials.benchtop === option.id
                    ? 'border-[#FDD202] shadow-lg'
                    : 'border-[#DBDBDB] hover:border-[#969696]'
                }`}
              >
                {materials.benchtop === option.id && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-[#FDD202] rounded-full flex items-center justify-center z-10">
                    <Check className="w-5 h-5 text-black" />
                  </div>
                )}
                <div className="h-40 overflow-hidden">
                  <img
                    src={option.image}
                    alt={option.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-black mb-1">{option.name}</h4>
                  <p className="text-sm text-[#969696] mb-2">{option.description}</p>
                  <div className="text-lg font-bold text-black">
                    {option.price === 0 ? 'Included' : `+$${option.price.toLocaleString()}`}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Cabinetry Color */}
        <div>
          <h3 className="text-xl font-bold text-black mb-6">Cabinetry Color</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CABINETRY_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() =>
                  updateConfiguration('materials', { ...materials, cabinetry: option.id })
                }
                className={`p-4 rounded-xl border-2 transition-all ${
                  materials.cabinetry === option.id
                    ? 'border-[#FDD202] bg-[#FDD202]/10'
                    : 'border-[#DBDBDB] hover:border-[#969696] bg-white'
                }`}
              >
                <div
                  className="w-full h-20 rounded-lg mb-3 border border-[#DBDBDB]"
                  style={{ backgroundColor: option.color }}
                />
                <div className="font-semibold text-sm text-black text-center">
                  {option.name}
                </div>
                <div className="text-xs text-[#969696] text-center mt-1">
                  {option.price === 0 ? 'Included' : `+$${option.price}`}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Flooring */}
        <div>
          <h3 className="text-xl font-bold text-black mb-6">Flooring</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {FLOORING_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() =>
                  updateConfiguration('materials', { ...materials, flooring: option.id })
                }
                className={`p-6 rounded-xl border-2 transition-all ${
                  materials.flooring === option.id
                    ? 'border-[#FDD202] bg-[#FDD202]/10'
                    : 'border-[#DBDBDB] hover:border-[#969696] bg-white'
                }`}
              >
                <div className="font-semibold text-black mb-2">{option.name}</div>
                <div className="text-sm text-[#969696]">
                  {option.price === 0 ? 'Included' : `+$${option.price}`}
                </div>
                {materials.flooring === option.id && (
                  <Check className="w-5 h-5 text-[#FDD202] mt-2" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}