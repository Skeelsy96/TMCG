import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function WalkInVan() {
  const inclusions = [
    '2-3 Group Commercial Espresso Machine',
    'Commercial Coffee Grinder (Premium)',
    'Multiple Commercial Fridges & Freezers',
    'Dual Sinks + Jug Rinser + Hand Wash Basin',
    'High-Capacity 48v Battery System',
    '5000W+ Victron Inverter',
    'Large Fresh & Waste Water Tanks (200L+)',
    'Extraction Fan & Full Ventilation System',
    'Professional Interior Lighting',
    'Multiple Service Windows',
    'Custom Interior Fit-Out & Finishes',
    'Ample Storage & Workspace',
    'Complimentary Barista Training',
    'Business Starter Guide & Ongoing Support'
  ];

  const vanOptions = [
    'Iveco Daily',
    'Mercedes Sprinter',
    'VW Crafter',
    'Ford Transit',
    'Renault Master',
    'Fiat Ducato',
    'LDV Deliver 9'
  ];

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
          <p className="text-xl text-gray-400 max-w-3xl">
            The ultimate mobile coffee solution. Maximum interior space for high-volume service, 
            multiple baristas, and premium event catering. Built for serious operators.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Walk-In Van Options</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {vanOptions.map((van) => (
                  <div key={van} className="bg-[#F5F5F5] rounded-xl p-4 text-center border border-[#DBDBDB]">
                    <p className="font-semibold text-black">{van}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Premium Package Inclusions</h2>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}