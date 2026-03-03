import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { CheckCircle, ArrowRight, Coffee, Truck, Building } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NewPackages() {
  const cards = [
    {
      title: 'New Van Packages',
      page: 'NewVans',
      description: 'Turn-key, fully equipped mobile coffee vans built to perform from day one.',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/1460956e5_ServeFromRearVans7.png',
      highlights: [
        'Turn-key builds with premium gear',
        'Designed for volume & speed',
        'Finance options available'
      ],
      badgeIcon: Truck
    },
    {
      title: 'Fit-Out Packages',
      page: 'FitOuts',
      description: 'Professional fit-outs for your chosen vehicle, optimised for workflow and compliance.',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/062a79d1b_ProductionFit-out4.jpg',
      highlights: [
        'Engineered for reliability',
        'Flexible layouts & finishes',
        'Built to Australian standards'
      ],
      badgeIcon: Building
    }
  ];

  const uspBlocks = [
    {
      title: 'Built for Australia-wide Compliance',
      copy: 'Every van and fit-out we build meets our strict quality standards and is guaranteed to comply with all local council requirements across Australia.'
    },
    {
      title: 'Complimentary Guides & Training',
      copy: 'We help you at every step: designing and configuring, planning what works, barista training + free barista kit, ongoing assistance, council permits, and understanding insurance & public liability.'
    },
    {
      title: 'Premium Equipment & Appliances',
      copy: 'All fit-outs include commercial-grade gear: Carimali Nimble 2-Group espresso machine, Carimali XO21 grinder, display + storage fridges, filtered hot/cold water system, multiple sinks, food-grade benchtops, smart storage, and a complete 48v Li-ion electrical system.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero */}
      <section className="bg-black py-16 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">New Packages</h1>
            <p className="text-lg text-gray-400 max-w-3xl">
              Choose a complete turn-key van or have us professionally fit-out your chosen vehicle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          {cards.map((c, i) => (
            <motion.div key={c.page} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={createPageUrl(c.page)} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#DBDBDB]">
                <div className="relative h-80 overflow-hidden">
                  <span className="absolute top-4 left-4 z-10 bg-[#FDD202] text-black text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <c.badgeIcon className="w-3.5 h-3.5" /> Explore
                  </span>
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white">{c.title}</h3>
                    <p className="text-white/90">{c.description}</p>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {c.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[#333333]">
                        <CheckCircle className="w-5 h-5 text-[#FDD202] flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 text-[#FDD202] font-semibold group-hover:gap-3 transition-all">
                    View More Details
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Educational / Discovery */}
      <section className="py-16 bg-white border-t border-[#DBDBDB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-black">Why Choose Our Builds</h2>
            <p className="text-[#333] mt-2">The essentials that come standard with every TMCG van.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {uspBlocks.map((u) => (
              <div key={u.title} className="rounded-2xl border border-[#DBDBDB] p-6 bg-[#F5F5F5]">
                <h3 className="text-xl font-semibold text-black mb-2">{u.title}</h3>
                <p className="text-[#333] text-sm leading-relaxed">{u.copy}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 text-sm text-[#666]">
            See the full list of inclusions on the <Link to={createPageUrl('FitOuts')} className="underline hover:text-black">Package Inclusions</Link> page.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to design your coffee van?</h3>
          <Link to={createPageUrl('VanConfigurator')} className="inline-flex items-center justify-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all">
            Design My Coffee Van
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}