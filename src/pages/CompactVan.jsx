import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CompactVan() {
  const inclusions = [
    '1 Group Commercial Espresso Machine (Carimali Nimble or equivalent)',
    'Commercial Coffee Grinder',
    'Dual Under-Counter Fridges',
    'Dual Sinks with Hot/Cold Water',
    '48v Lithium Battery System (Pylontech)',
    '3000W Victron Inverter',
    'Fresh & Waste Water Tanks',
    'Interior LED Lighting',
    'Service Window with Awning',
    'Custom Benchtops & Storage',
    'Complimentary Barista Training',
    'Business Starter Guide'
  ];

  const optionalExtras = [
    'Food Display Unit',
    'Additional Fridges',
    'Upgraded Espresso Machine',
    'Custom Van Graphics & Branding',
    'Point of Sale System',
    'Extended Battery Capacity'
  ];

  const vanOptions = [
    'VW Caddy',
    'Peugeot Partner',
    'Renault Kangoo',
    'Suzuki APV',
    'Holden Combo',
    'Ford Transit Connect'
  ];

  const gallery = [
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/220ee09c6_SUV7.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/2017f0be7_SUV6.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/bb9ffd40a_BMWX52.JPG'
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#DBDBDB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-[#969696]">
            <Link to={createPageUrl('TMCGHome')} className="hover:text-[#FDD202]">Home</Link>
            <span>/</span>
            <Link to={createPageUrl('NewVans')} className="hover:text-[#FDD202]">New Van Packages</Link>
            <span>/</span>
            <span className="text-black">Compact Van</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-black py-16 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={createPageUrl('NewVans')} className="inline-flex items-center gap-2 text-white hover:text-[#FDD202] mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Packages
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Compact Van <span className="text-[#FDD202]">Package</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Ideal for navigating tight streets, industrial estates, school zones, and local back streets. 
            Lower running costs with all the professional equipment you need.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Van Options */}
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Compact Van Options</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {vanOptions.map((van) => (
                  <div key={van} className="bg-[#F5F5F5] rounded-xl p-4 text-center border border-[#DBDBDB]">
                    <p className="font-semibold text-black">{van}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions */}
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">What's Included</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FDD202] flex-shrink-0 mt-0.5" />
                    <span className="text-[#333333]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Extras */}
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Optional Extras</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {optionalExtras.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 border-2 border-[#FDD202] rounded flex-shrink-0 mt-0.5" />
                    <span className="text-[#333333]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Gallery</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {gallery.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden">
                    <img
                      src={img}
                      alt={`Compact coffee van example ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="bg-black rounded-2xl p-8 text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-4">
                Interested in This Package?
              </h3>
              <p className="text-gray-400 mb-6">
                Let's discuss your goals and create the perfect compact van setup for your business.
              </p>
              <div className="space-y-3">
                <a
                  href={createPageUrl('TMCGHome') + '#enquiry-form'}
                  className="block w-full text-center bg-[#FDD202] text-black px-6 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
                >
                  Enquire About This Package
                </a>
                <Link
                  to={createPageUrl('BookCall')}
                  className="block w-full text-center bg-white text-black px-6 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all"
                >
                  Book a Phone Consultation
                </Link>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-4">Questions? Call us directly:</p>
                <a href="tel:1300746020" className="text-[#FDD202] text-lg font-semibold hover:underline">
                  1300 74 60 20
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}