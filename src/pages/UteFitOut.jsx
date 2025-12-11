import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function UteFitOut() {
  const inclusions = [
    '1 Group Commercial Espresso Machine',
    'Commercial Coffee Grinder',
    'Compact Fridge',
    'Water System with Tanks',
    'Battery & Inverter System',
    'Tray or Canopy Service Setup',
    'Weather Protection',
    'Service Counter',
    'Storage Solutions',
    'Complimentary Barista Training'
  ];

  const uteOptions = [
    'Toyota HiLux',
    'Ford Ranger',
    'Isuzu D-Max',
    'Mitsubishi Triton',
    'Mazda BT-50',
    'Nissan Navara'
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
            <span className="text-black">Ute Fit-Out</span>
          </div>
        </div>
      </div>

      <section className="bg-black py-16 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={createPageUrl('FitOuts')} className="inline-flex items-center gap-2 text-white hover:text-[#FDD202] mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Fit-Outs
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ute <span className="text-[#FDD202]">Fit-Out Package</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Rugged, reliable, and versatile. Service from your tray or canopy setup. 
            Perfect for remote locations, construction sites, and tough Australian conditions.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Compatible Utes</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {uteOptions.map((ute) => (
                  <div key={ute} className="bg-[#F5F5F5] rounded-xl p-4 text-center border border-[#DBDBDB]">
                    <p className="font-semibold text-black">{ute}</p>
                  </div>
                ))}
              </div>
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
          </div>

          <div className="lg:col-span-1">
            <div className="bg-black rounded-2xl p-8 text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-4">Get Your Ute Quote</h3>
              <p className="text-gray-400 mb-6">
                Let's discuss fitting out your ute for mobile coffee service.
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