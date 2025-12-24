import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, Sparkles, CheckCircle } from 'lucide-react';

export default function CustomVan() {
  const appliancesAndAccessories = [
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
  ];

  const powerSystem = [
    '5000 Watt 48V Victron Inverter',
    '3 x 100 Amp Hour 48V Lithium-ion Battery',
    'Battery Monitor',
    'Electrical Certificate',
    'Tagging of Appliances',
    'External Power Inlet for Mains Supply',
    'External Power Lead',
    'All Associated Wiring of Appliances'
  ];

  const waterAndWaste = [
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
  ];

  const baristaKit = [
    '3 x 1L Milk Jugs',
    'Chocolate Shaker',
    'Commercial Grade Tamp',
    'Barista Training Videos',
    'Quick Step Barista Guide and Drinks Menu',
    'TMCG Business Starter Pack'
  ];

  const customizationOptions = {
    interior: [
      'Alu-panel Design Options - Splash back',
      'Powder Coated or Painted - Colour of choice',
      'Vinyl Wrapped - Design of choice'
    ],
    lighting: [
      '(2x) LED Downlights - optional vintage bulbs',
      'LED Strip lighting'
    ],
    benchtop: [
      'Stainless-Steel bench top',
      'Timber bench top'
    ]
  };

  const gallery = [
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/43b23d8b5_FJCruiser3.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/1a5923ea7_FJCruiser2.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/f12d813ed_Landcruiser1.jpg'
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-white border-b border-[#DBDBDB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-[#969696]">
            <Link to={createPageUrl('TMCGHome')} className="hover:text-[#FDD202]">Home</Link>
            <span>/</span>
            <Link to={createPageUrl('NewVans')} className="hover:text-[#FDD202]">New Van Packages</Link>
            <span>/</span>
            <span className="text-black">Custom & Bespoke</span>
          </div>
        </div>
      </div>

      <section className="bg-black py-16 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={createPageUrl('NewVans')} className="inline-flex items-center gap-2 text-white hover:text-[#FDD202] mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Packages
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-[#FDD202]" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Custom & <span className="text-[#FDD202]">Bespoke Builds</span>
            </h1>
          </div>
          <div className="max-w-3xl">
            <p className="text-2xl text-[#FDD202] font-bold mb-4">For Those Who Want Something a Little Different!</p>
            <p className="text-xl text-gray-400 mb-4">
              Our Bespoke Van Package is tailored to meet the needs of those who want something a bit different.
            </p>
            <p className="text-gray-400">
              These types of vans are made to turn heads! Leveraging their 'Kerb Appeal' can be a very successful strategy for a Mobile Coffee Business.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Standard Package Inclusions</h2>
              
              <h3 className="text-lg font-bold text-black mb-3 mt-6">Appliances and Accessories</h3>
              <div className="space-y-2">
                {appliancesAndAccessories.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FDD202] flex-shrink-0 mt-0.5" />
                    <span className="text-[#333333]">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-black mb-3 mt-6">Power System</h3>
              <div className="space-y-2">
                {powerSystem.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FDD202] flex-shrink-0 mt-0.5" />
                    <span className="text-[#333333]">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-black mb-3 mt-6">Water and Waste</h3>
              <div className="space-y-2">
                {waterAndWaste.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FDD202] flex-shrink-0 mt-0.5" />
                    <span className="text-[#333333]">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-black mb-3 mt-6">Barista Kit</h3>
              <div className="space-y-2">
                {baristaKit.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FDD202] flex-shrink-0 mt-0.5" />
                    <span className="text-[#333333]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Interior Customization Options</h2>
              
              <h3 className="text-lg font-semibold text-black mb-3">Design Options - Splash Back</h3>
              <ul className="space-y-2 mb-6">
                {customizationOptions.interior.map((item, idx) => (
                  <li key={idx} className="text-[#333333] ml-6">• {item}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-black mb-3">Internal Lighting</h3>
              <ul className="space-y-2 mb-6">
                {customizationOptions.lighting.map((item, idx) => (
                  <li key={idx} className="text-[#333333] ml-6">• {item}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-black mb-3">Bench Top Options</h3>
              <ul className="space-y-2">
                {customizationOptions.benchtop.map((item, idx) => (
                  <li key={idx} className="text-[#333333] ml-6">• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Gallery</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {gallery.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden">
                    <img
                      src={img}
                      alt={`Custom coffee van build example ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-black rounded-2xl p-8 text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-4">Let's Build Your Vision</h3>
              <p className="text-gray-400 mb-6">
                Every custom build is quoted individually. Let's discuss what's possible.
              </p>
              <div className="space-y-3">
                <a
                  href={createPageUrl('TMCGHome') + '#enquiry-form'}
                  className="block w-full text-center bg-[#FDD202] text-black px-6 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
                >
                  Start Custom Quote
                </a>
                <Link
                  to={createPageUrl('BookCall')}
                  className="block w-full text-center bg-white text-black px-6 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all"
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}