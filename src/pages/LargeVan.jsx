import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function LargeVan() {
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

  const DEFAULT_LARGE_VANS = [
    'LDV G10+',
    'Toyota HiAce',
    'Mercedes Vito',
    'VW Transporter',
    'Ford Transit Custom',
    'Renault Trafic',
    'Hyundai i-Load'
  ];

  const { data: largeVanModels = [] } = useQuery({
    queryKey: ['van-models', 'large'],
    queryFn: () => base44.entities.VanModel.filter({ package_type: 'large', is_active: true }, 'order', 100),
  });

  const vanOptions = largeVanModels.length ? largeVanModels.map(v => v.name) : DEFAULT_LARGE_VANS;

  const gallery = [
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/1460956e5_ServeFromRearVans7.png',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/bc29b3948_G10ServeFromRearVans2.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/74d426f2e_HyundaiServeFromRear15.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/3b0d5fee7_HyundaiServeFromRear11.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/99ad4c7ac_HyundaiServeFromRear9.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/f4e8bcb5f_HyundaiServeFromRear12.jpg'
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
            <span className="text-black">Large Van</span>
          </div>
        </div>
      </div>

      <section className="bg-black py-16 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={createPageUrl('NewVans')} className="inline-flex items-center gap-2 text-white hover:text-[#FDD202] mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Packages
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Large Van <span className="text-[#FDD202]">Package</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mb-4">
            The optimal and most popular choice for mobile coffee operators, engineered for unbeatable operational adaptability.
          </p>
          <p className="text-gray-400 max-w-3xl mb-6">
            These purpose-built vans offer high versatility, ample room, and superb efficiency. From local events like open-homes or Sunday markets to large, multi-day events such as weddings or music festivals, these vans can handle it all.
          </p>
          <div className="bg-white/5 rounded-2xl p-6 max-w-4xl">
            <p className="text-gray-400 mb-4">
              <strong className="text-white">Optional Equipment Available:</strong> Pie-Warmers, Blenders, Sandwich Presses, Ice-Machines, and additional fridges or freezers.
            </p>
            <p className="text-sm text-[#FDD202]">
              Note: Incorporating optional items will increase power consumption and requires additional batteries.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Large Van Options</h2>
              {/* Data-driven: manage options via VanModel (package_type='large') */}
              <div className="grid sm:grid-cols-3 gap-4">
                {vanOptions.map((van) => (
                  <div key={van} className="bg-[#F5F5F5] rounded-xl p-4 text-center border border-[#DBDBDB]">
                    <p className="font-semibold text-black">{van}</p>
                  </div>
                ))}
              </div>
            </div>

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
                      alt={`Large serve-from-rear coffee van example ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-black rounded-2xl p-8 text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-4">Get Your Quote</h3>
              <p className="text-gray-400 mb-6">
                Ready to build your high-volume mobile coffee business?
              </p>
              <div className="space-y-3">
                <a
                  href={createPageUrl('TMCGHome') + '#enquiry-form'}
                  className="block w-full text-center bg-[#FDD202] text-black px-6 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
                >
                  Enquire Now
                </a>
                <Link
                  to={createPageUrl('BookCall')}
                  className="block w-full text-center bg-white text-black px-6 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all"
                >
                  Book a Call
                </Link>
                <Link
                  to={createPageUrl('VanConfigurator')}
                  className="block w-full text-center bg-white text-black px-6 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all"
                >
                  Build Your Van
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}