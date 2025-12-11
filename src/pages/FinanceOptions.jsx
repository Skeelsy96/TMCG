import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { DollarSign, ArrowRight, CheckCircle, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FinanceOptions() {
  const benefits = [
    'Preserve working capital for stock and operations',
    'Flexible repayment structures (weekly, fortnightly, monthly)',
    'Fast approval process',
    'Competitive rates for mobile coffee businesses',
    'Tax benefits through equipment financing'
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
              Flexible <span className="text-[#FDD202]">Finance Options</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Don't let upfront costs hold you back. Our trusted finance partners offer 
              flexible structures tailored to mobile coffee businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Finance Partners */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Valiant Finance - PREFERRED */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-3 -right-3 bg-[#FDD202] text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 z-10">
                <Star className="w-4 h-4" />
                Preferred Partner
              </div>
              <Link
                to={createPageUrl('ValiantFinance')}
                className="group block bg-white rounded-2xl p-8 border-2 border-[#FDD202] hover:shadow-xl transition-all h-full"
              >
                <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-[#FDD202] transition-colors">
                  Valiant Finance
                </h3>
                <p className="text-[#333333] mb-6">
                  Fast approvals, flexible terms, and industry expertise. Compare 300+ lenders 
                  to find the perfect loan structure for your coffee van.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-[#333333]">
                    <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                    Approvals within hours
                  </li>
                  <li className="flex items-center gap-2 text-[#333333]">
                    <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                    Compare 300+ lenders
                  </li>
                  <li className="flex items-center gap-2 text-[#333333]">
                    <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                    Dedicated broker support
                  </li>
                </ul>
                <div className="flex items-center gap-2 text-[#FDD202] font-semibold group-hover:gap-3 transition-all">
                  Explore Finance Calculator
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </motion.div>

            {/* SEFS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB] hover:shadow-lg transition-all h-full">
                <h3 className="text-2xl font-bold text-black mb-4">
                  SEFS - Steve Elliot Financial Services
                </h3>
                <p className="text-[#333333] mb-6">
                  Specialist equipment finance with deep understanding of the mobile coffee industry. 
                  Flexible terms and fast turnaround.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-[#333333]">
                    <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                    Industry specialist
                  </li>
                  <li className="flex items-center gap-2 text-[#333333]">
                    <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                    Flexible structures
                  </li>
                  <li className="flex items-center gap-2 text-[#333333]">
                    <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                    Fast approvals
                  </li>
                </ul>
                <a
                  href={createPageUrl('TMCGContact')}
                  className="inline-flex items-center gap-2 text-black font-semibold hover:text-[#FDD202] transition-colors"
                >
                  Contact for Quote
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Finance */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Why <span className="text-[#FDD202]">Finance Your Van?</span>
          </h2>
          <div className="space-y-4">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 bg-[#F5F5F5] p-6 rounded-xl border border-[#DBDBDB]"
              >
                <CheckCircle className="w-6 h-6 text-[#FDD202] flex-shrink-0 mt-0.5" />
                <span className="text-[#333333] text-lg">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to <span className="text-[#FDD202]">Get Started?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Speak with our team about finance options and find the best structure for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={createPageUrl('ValiantFinance')}
              className="inline-flex items-center justify-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
            >
              Use Finance Calculator
              <ArrowRight className="w-5 h-5" />
            </Link>
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