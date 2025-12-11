import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Coffee, Award, Users, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TMCGAbout() {
  const milestones = [
    { icon: Award, number: '900+', label: 'Vans Built' },
    { icon: Coffee, number: '1M+ kg', label: 'Coffee Sold' },
    { icon: Users, number: '19+', label: 'Years Experience' },
    { icon: Heart, number: '100%', label: 'Passion Driven' }
  ];

  const values = [
    {
      title: 'Quality Over Everything',
      description: 'Every van we build is a reflection of our 19+ year commitment to excellence and craftsmanship.'
    },
    {
      title: 'Lifestyle First',
      description: 'We don\'t build franchises — we build lifestyle businesses that give you freedom and flexibility.'
    },
    {
      title: 'Complete Ecosystem',
      description: 'From vans to coffee to training to events — we support you at every stage of your journey.'
    },
    {
      title: 'Proven Success',
      description: '900+ successful operators across Australia prove our system works.'
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
              About <span className="text-[#FDD202]">The Mobile Coffee Group</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Australia's premier mobile coffee van specialists, building lifestyle businesses since 2006
            </p>
          </motion.div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {milestones.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#FDD202]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-[#FDD202]" />
                </div>
                <div className="text-4xl font-bold text-black mb-2">{item.number}</div>
                <div className="text-[#969696]">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-black mb-6">Our Story</h2>
              <div className="space-y-4 text-[#333333] leading-relaxed">
                <p>
                  The Mobile Coffee Group was born from a simple vision: to help Australians build 
                  lifestyle businesses that offer freedom, flexibility, and financial independence.
                </p>
                <p>
                  Founded by Phil, who started as a mobile coffee operator himself, TMCG understands 
                  the industry from the inside out. After years of operating his own successful van, 
                  Phil recognized the need for quality, turn-key solutions that made it easier for 
                  others to enter the mobile coffee space.
                </p>
                <p>
                  19+ years and 900+ vans later, we've built Australia's most comprehensive mobile 
                  coffee ecosystem — from custom van builds to in-house coffee roasting, operator 
                  training, events networks, and ongoing support.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/9c82541a7_3RealEstateVanslinedup2.JPG"
                alt="TMCG fleet of custom coffee vans"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#FDD202] rounded-2xl p-6 shadow-xl">
                <div className="text-4xl font-bold text-black">19+</div>
                <div className="text-black/70">Years Experience</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-4 text-center">Our Values</h2>
          <p className="text-[#333333] text-center mb-12 max-w-2xl mx-auto">
            What drives us every day at The Mobile Coffee Group
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4 p-6 rounded-2xl border border-[#969696] hover:border-[#FDD202] hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-[#FDD202]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-[#FDD202]" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-2">{value.title}</h3>
                  <p className="text-[#333333] text-sm">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your <span className="text-[#FDD202]">Coffee Van Journey?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's discuss your goals and find the perfect van package for your lifestyle.
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