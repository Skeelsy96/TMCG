import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Coffee, CheckCircle, ArrowRight, Award, Zap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EarlyBirdCoffee() {
  const blends = [
    {
      name: 'Vibe Blend',
      description: 'Smooth, balanced, and crowd-pleasing',
      notes: ['Chocolate', 'Caramel', 'Smooth finish'],
      ideal: 'Perfect all-rounder for daily service'
    },
    {
      name: 'Alpha Blend',
      description: 'Bold, strong, and full-bodied',
      notes: ['Dark chocolate', 'Nutty', 'Strong kick'],
      ideal: 'For customers who love a powerful brew'
    },
    {
      name: 'Honeycomb Blend',
      description: 'Sweet, light, and aromatic',
      notes: ['Honey', 'Floral', 'Light body'],
      ideal: 'Specialty coffee enthusiasts'
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
            <div className="inline-flex items-center gap-2 bg-[#FDD202]/10 border border-[#FDD202]/30 rounded-full px-4 py-2 mb-6">
              <Coffee className="w-4 h-4 text-[#FDD202]" />
              <span className="text-[#FDD202] text-sm font-medium">In-House Roastery</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Early Bird <span className="text-[#FDD202]">Coffee</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Premium coffee blends engineered specifically for mobile coffee vans. 
              AA Grade beans, roasted weekly on-demand, designed for consistency in mobile environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Early Bird */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Why <span className="text-[#FDD202]">Early Bird?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FDD202]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#FDD202]" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">AA Grade Beans</h3>
              <p className="text-[#333333]">Only the highest quality beans from trusted sources</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FDD202]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-[#FDD202]" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Mobile-Optimized</h3>
              <p className="text-[#333333]">Blends engineered for consistency in mobile setups</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FDD202]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#FDD202]" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Roasted Weekly</h3>
              <p className="text-[#333333]">Fresh roasts delivered on your schedule</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blends */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">Our Blends</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blends.map((blend, idx) => (
              <motion.div
                key={blend.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-[#DBDBDB] hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold text-black mb-2">{blend.name}</h3>
                <p className="text-[#333333] mb-6">{blend.description}</p>
                <div className="mb-6">
                  <h4 className="font-semibold text-black mb-3">Tasting Notes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {blend.notes.map((note) => (
                      <span key={note} className="bg-[#FDD202]/10 text-black px-3 py-1 rounded-full text-sm border border-[#FDD202]">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-[#DBDBDB]">
                  <p className="text-sm text-[#333333] italic">{blend.ideal}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Order CTA */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Order <span className="text-[#FDD202]">Early Bird Coffee</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Available exclusively to TMCG van owners and mobile coffee operators. 
            Get in touch to discuss wholesale pricing and delivery schedules.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={createPageUrl('TMCGHome') + '#enquiry-form'}
              className="inline-flex items-center justify-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
            >
              Enquire to Order
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              to={createPageUrl('TMCGContact')}
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Support & <span className="text-[#FDD202]">Training</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#F5F5F5] rounded-2xl p-8 border border-[#DBDBDB]">
              <h3 className="text-xl font-bold text-black mb-4">Barista Training</h3>
              <p className="text-[#333333] mb-4">
                Complimentary training videos and guides to perfect your coffee-making skills.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[#333333]">
                  <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                  Espresso fundamentals
                </li>
                <li className="flex items-center gap-2 text-[#333333]">
                  <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                  Milk texturing techniques
                </li>
                <li className="flex items-center gap-2 text-[#333333]">
                  <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                  Equipment maintenance
                </li>
              </ul>
            </div>
            <div className="bg-[#F5F5F5] rounded-2xl p-8 border border-[#DBDBDB]">
              <h3 className="text-xl font-bold text-black mb-4">Technical Support</h3>
              <p className="text-[#333333] mb-4">
                Ongoing help with equipment, recipes, and troubleshooting from our expert team.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[#333333]">
                  <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                  Equipment setup guides
                </li>
                <li className="flex items-center gap-2 text-[#333333]">
                  <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                  Recipe optimization
                </li>
                <li className="flex items-center gap-2 text-[#333333]">
                  <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                  Direct support line
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}