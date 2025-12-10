import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users } from 'lucide-react';

export default function TrustSection() {
  return (
    <section className="py-20 bg-[#F5F5F5] border-y border-[#969696]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/9c82541a7_3RealEstateVanslinedup2.JPG"
              alt="Three premium coffee vans built by The Mobile Coffee Group lined up - Australian mobile coffee business fleet"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/a55736403_Walk-InCustomerthumbsup.png"
              alt="Happy mobile coffee van owner showing thumbs up after purchase - Successful coffee business customer testimonial"
              className="w-full h-64 object-cover rounded-2xl shadow-lg mt-8"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-[#FDD202]/20 border border-[#FDD202] rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-black" />
              <span className="text-black text-sm font-semibold">Verified Quality</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Built By <span className="text-[#FDD202]">The Experts</span>
            </h2>
            
            <p className="text-[#333333] text-lg leading-relaxed mb-8">
              Many vans on our platform are built by The Mobile Coffee Group, Australia's 
              leading manufacturer with 19+ years of experience and 900+ vans built. 
              Look for the "Built by TMCG" badge for verified quality and craftsmanship.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FDD202] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-black" />
                </div>
                <div className="text-2xl font-bold text-black">900+</div>
                <div className="text-sm text-[#333333]">Vans Built</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FDD202] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-black" />
                </div>
                <div className="text-2xl font-bold text-black">19+</div>
                <div className="text-sm text-[#333333]">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FDD202] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <div className="text-2xl font-bold text-black">100%</div>
                <div className="text-sm text-[#333333]">Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}