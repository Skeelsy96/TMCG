import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function WalkInVan() {
  const appliancesAndAccessories = [
    'Carimali Nimble 2-Group Commercial Coffee Machine',
    'Carimali XO21 Automatic Commercial Grinder',
    'Schmick 70L Single Door Fridge',
    '198L 2 Door Display Fridge',
    'Fridge Dividers',
    '2 x Under Counter Display Units',
    '3 x Spring Loaded Cup Dispensers',
    'Lid Holders',
    'Syrup Holders',
    'Paper Towel Rack / Dispenser',
    'Soap Dispenser',
    'Roof Extraction Fan - Including Turbo Vent',
    'Lockable Cash Till',
    'Knock Box',
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
      'Alu-panel Design Options - Internal Walls and Roof Lining',
      'Powder Coated or Painted - Colour of choice',
      'Vinyl Wrapped - Design of choice'
    ],
    lighting: [
      '(8x) LED Down lights',
      'LED Strip lighting'
    ],
    benchtop: [
      'Stainless-Steel bench top',
      'Timber bench top'
    ]
  };

  const DEFAULT_WALKIN_VANS = [
    'Iveco Daily',
    'Mercedes Sprinter',
    'VW Crafter',
    'Ford Transit',
    'Renault Master',
    'Fiat Ducato',
    'LDV Deliver 9'
  ];

  const { data: walkInVanModels = [] } = useQuery({
    queryKey: ['van-models', 'walk_in'],
    queryFn: () => base44.entities.VanModel.filter({ package_type: 'walk_in', is_active: true }, 'order', 100),
  });

  const vanOptions = walkInVanModels.length ? walkInVanModels.map(v => v.name) : DEFAULT_WALKIN_VANS;

  const gallery = [
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/062a79d1b_ProductionFit-out4.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/75d3c2840_ProductionFit-out1.jpeg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/02e641f3a_ProductionFit-out2.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/6bee872cf_ProductionFit-out3.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/1460956e5_ServeFromRearVans7.png',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/bc29b3948_G10ServeFromRearVans2.jpg'
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
            <span className="text-black">Walk-In Van</span>
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
            Walk-In Van <span className="text-[#FDD202]">Package</span>
          </h1>
          <div className="max-w-3xl">
            <p className="text-2xl text-[#FDD202] font-bold mb-4">Big Spaces | Big Impacts | Big Opportunities</p>
            <p className="text-xl text-gray-400 mb-4">
              Perfect for High-Volume service. Capitalising on abundant room for storage and additional workspace.
            </p>
            <p className="text-gray-400 mb-6">
              These vans are optimal for large events and high-turnover catering. Ideal for single operators or 2-3 Staff members. Offering access through the rear barn-doors, service is carried out through the engineered "push-out" service window which offers a high vantage point for the operator to easily take orders.
            </p>
            <div className="bg-white/5 rounded-2xl p-6">
              <p className="text-sm text-[#FDD202]">
                Note: Incorporating optional items will increase power consumption and requires additional batteries. Share your vision with us so we can ensure your package meets your specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Walk-In Van Options</h2>
              {/* Data-driven: manage options via VanModel (package_type='walk_in') */}
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
              
              <h3 className="text-lg font-semibold text-black mb-3">Design Options</h3>
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
                      alt={`Walk-in coffee van interior and setup example ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-black rounded-2xl p-8 text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-4">Premium Package</h3>
              <p className="text-gray-400 mb-6">
                Discuss your high-volume business goals with our team.
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