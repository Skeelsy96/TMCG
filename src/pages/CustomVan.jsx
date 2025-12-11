import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, Sparkles, CheckCircle } from 'lucide-react';

export default function CustomVan() {
  const examples = [
    { title: 'Piaggio Ape Conversions', desc: 'Unique Italian-style mobile cafes' },
    { title: 'Food Truck Hybrids', desc: 'Coffee + food service combinations' },
    { title: 'Vintage Vehicle Conversions', desc: 'Classic cars transformed into coffee bars' },
    { title: 'Trailer Systems', desc: 'Custom-built coffee trailers' },
    { title: 'Specialty Vehicles', desc: 'Unique builds for brand activations' }
  ];

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
          <p className="text-xl text-gray-400 max-w-3xl">
            Have a unique vision? We specialize in one-off custom builds — from vintage vehicles 
            to food trucks, trailers, and anything in between. Your imagination is the only limit.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Custom Build Examples</h2>
              <div className="space-y-4">
                {examples.map((example, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-[#F5F5F5] rounded-xl border border-[#DBDBDB]">
                    <CheckCircle className="w-6 h-6 text-[#FDD202] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-black mb-1">{example.title}</h3>
                      <p className="text-[#333333] text-sm">{example.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">How It Works</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#FDD202] rounded-full flex items-center justify-center text-black font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-black mb-1">Initial Consultation</h3>
                    <p className="text-[#333333]">Discuss your vision, requirements, and budget</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#FDD202] rounded-full flex items-center justify-center text-black font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-black mb-1">Design & Quote</h3>
                    <p className="text-[#333333]">We create 3D renders and detailed specifications</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#FDD202] rounded-full flex items-center justify-center text-black font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-black mb-1">Build Phase</h3>
                    <p className="text-[#333333]">Expert craftsmen bring your vision to life</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#FDD202] rounded-full flex items-center justify-center text-black font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-bold text-black mb-1">Training & Handover</h3>
                    <p className="text-[#333333]">Complete training and your business journey begins</p>
                  </div>
                </div>
              </div>
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