import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Coffee, ArrowRight, CheckCircle, Building, Truck, Boxes } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NewVans() {
  const packages = [
    {
      name: 'Compact Van Package',
      slug: 'CompactVan',
      description: 'Perfect for tight streets, school zones, and local neighbourhoods',
      image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&auto=format&fit=crop',
      icon: Coffee,
      highlights: ['Low running costs', 'Easy parking', 'Ideal for estates']
    },
    {
      name: 'Large Van Package',
      slug: 'LargeVan',
      description: 'High-volume service for markets, festivals, and busy locations',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/1460956e5_ServeFromRearVans7.png',
      icon: Truck,
      highlights: ['Multiple staff capacity', 'Premium equipment', 'High volume']
    },
    {
      name: 'Walk-In Van Package',
      slug: 'WalkInVan',
      description: 'Maximum space and capability for premium events',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/062a79d1b_ProductionFit-out4.jpg',
      icon: Building,
      highlights: ['Full interior access', 'Multi-barista setup', 'Premium events']
    },
    {
      name: 'Custom & Bespoke',
      slug: 'CustomVan',
      description: 'Totally custom builds tailored to your unique vision',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
      icon: Boxes,
      highlights: ['Unlimited customization', 'Any vehicle type', 'Unique builds']
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero */}
      <section className="bg-black py-20 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              New Mobile Coffee <span className="text-[#FDD202]">Van Packages</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              We don't just build vans — we build lifestyle businesses. Every package comes fully loaded 
              with commercial equipment, power systems, water tanks, and complimentary barista training.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FDD202]">900+</div>
                <div className="text-gray-500">Vans Built</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FDD202]">19+</div>
                <div className="text-gray-500">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FDD202]">100%</div>
                <div className="text-gray-500">Turn-Key Solutions</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={createPageUrl(pkg.slug)}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-[#DBDBDB]"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={`${pkg.name} - Premium mobile coffee van solution by TMCG`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#FDD202] rounded-lg flex items-center justify-center">
                          <pkg.icon className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                      </div>
                      <p className="text-white/90">{pkg.description}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {pkg.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[#333333]">
                          <CheckCircle className="w-5 h-5 text-[#FDD202] flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-[#FDD202] font-semibold group-hover:gap-3 transition-all">
                      View Package Details
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Design Your <span className="text-[#FDD202]">Dream Van?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's discuss your vision, lifestyle goals, and build a van package that's perfect for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={createPageUrl('TMCGHome') + '#enquiry-form'}
              className="inline-flex items-center justify-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              to={createPageUrl('BookCall')}
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}