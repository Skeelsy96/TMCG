import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowRight, CheckCircle, Truck, Car } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FitOuts() {
  const packages = [
    {
      name: 'SUV Fit-Out Package',
      slug: 'SUVFitOut',
      description: 'Transform your Jeep, LandCruiser, or adventure SUV into a premium mobile coffee rig',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/f12d813ed_Landcruiser1.jpg',
      icon: Car,
      highlights: ['Adventure-ready', 'Lifestyle flexibility', 'Premium finish']
    },
    {
      name: 'Ute Fit-Out Package',
      slug: 'UteFitOut',
      description: 'Purpose-built tray or canopy setups for maximum versatility',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop',
      icon: Truck,
      highlights: ['Tray service', 'Canopy options', 'Rugged & reliable']
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <section className="bg-black py-20 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transform the <span className="text-[#FDD202]">Vehicle You Already Own</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Already have a vehicle? We can transform your SUV, ute, or existing vehicle into 
              a fully-equipped mobile coffee business with professional-grade equipment and finishes.
            </p>
          </motion.div>
        </div>
      </section>

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
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={`${pkg.name} - Mobile coffee fit-out solution`}
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
                      View Fit-Out Details
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Other Vehicle <span className="text-[#FDD202]">Fit-Outs Available</span>
          </h2>
          <p className="text-xl text-[#333333] mb-8">
            We can fit out almost any vehicle type. Mini trucks, trailers, vintage cars, and more. 
            Get in touch to discuss your specific vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={createPageUrl('TMCGHome') + '#enquiry-form'}
              className="inline-flex items-center justify-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
            >
              Discuss My Vehicle
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              to={createPageUrl('BookCall')}
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-[#333333] transition-all"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}