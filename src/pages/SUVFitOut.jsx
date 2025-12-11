import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, CheckCircle, Mountain } from 'lucide-react';

export default function SUVFitOut() {
  const inclusions = [
    '1-2 Group Commercial Espresso Machine',
    'Commercial Coffee Grinder',
    'Compact Fridge System',
    'Water System (Fresh & Waste)',
    '12v/48v Battery & Inverter System',
    'Slide-Out or Swing-Out Service Platform',
    'Custom Interior Cabinetry',
    'LED Lighting Package',
    'Awning & Weather Protection',
    'Complimentary Barista Training'
  ];

  const suvOptions = [
    'Jeep Wrangler',
    'Suzuki Jimny',
    'Toyota LandCruiser 70/79 Series',
    'BMW X5',
    'LandRover Defender',
    'Toyota FJ Cruiser',
    'Nissan Patrol'
  ];

  const gallery = [
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/4b3baa28a_SUVOneSmallArmy1.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/a5eddedf7_SUVOneSmallArmy5.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/220ee09c6_SUV7.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/bb9ffd40a_BMWX52.JPG',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/2017f0be7_SUV6.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/43b23d8b5_FJCruiser3.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/1a5923ea7_FJCruiser2.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/f12d813ed_Landcruiser1.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/36563daeb_Landcruiser2.jpg'
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-white border-b border-[#DBDBDB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-[#969696]">
            <Link to={createPageUrl('TMCGHome')} className="hover:text-[#FDD202]">Home</Link>
            <span>/</span>
            <Link to={createPageUrl('FitOuts')} className="hover:text-[#FDD202]">Fit-Out Packages</Link>
            <span>/</span>
            <span className="text-black">SUV Fit-Out</span>
          </div>
        </div>
      </div>

      <section className="bg-black py-16 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={createPageUrl('FitOuts')} className="inline-flex items-center gap-2 text-white hover:text-[#FDD202] mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Fit-Outs
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Mountain className="w-8 h-8 text-[#FDD202]" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              SUV <span className="text-[#FDD202]">Fit-Out Package</span>
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl">
            Combine your love for adventure with a mobile coffee business. Perfect for those who want 
            the ultimate lifestyle vehicle — coffee by day, adventures on weekends.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Popular SUV Options</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {suvOptions.map((suv) => (
                  <div key={suv} className="bg-[#F5F5F5] rounded-xl p-4 text-center border border-[#DBDBDB]">
                    <p className="font-semibold text-black text-sm">{suv}</p>
                  </div>
                ))}
              </div>
              <p className="text-[#333333] mt-6">
                Don't see your vehicle? We can fit out most SUVs and 4x4s. Get in touch to discuss.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Fit-Out Inclusions</h2>
              <div className="space-y-3">
                {inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FDD202] flex-shrink-0 mt-0.5" />
                    <span className="text-[#333333]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Gallery - SUV Builds</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {gallery.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden">
                    <img
                      src={img}
                      alt={`SUV coffee fit-out showcase ${idx + 1} - Premium mobile coffee setup`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-black rounded-2xl p-8 text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-4">Get Your SUV Quote</h3>
              <p className="text-gray-400 mb-6">
                Transform your adventure vehicle into a mobile coffee business.
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}