import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "The Mobile Coffee Group transformed my dream into a reality. Their van packages are top-notch, and the support has been incredible. My business is thriving!",
    name: "Sarah J.",
    business: "Coffee On Wheels",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/a55736403_Walk-InCustomerthumbsup.png"
  },
  {
    quote: "I purchased a pre-loved van through TMCG, and the process was seamless. The quality of their offerings, even second-hand, is truly impressive. Highly recommend!",
    name: "Mark T.",
    business: "Daily Brew Co.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/9c82541a7_3RealEstateVanslinedup2.JPG"
  },
  {
    quote: "From the consultation to the final fit-out, TMCG exceeded all expectations. They understood my vision and delivered a van that's a real head-turner.",
    name: "Emily R.",
    business: "Urban Espresso",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/062a79d1b_ProductionFit-out4.jpg"
  }
];

export default function TestimonialSlider() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            What Our <span className="text-[#FDD202]">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Hear from successful mobile coffee entrepreneurs across Australia
          </p>
        </div>

        <div className="relative">
          <div className="relative flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 snap-center px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg h-full flex flex-col justify-between border border-[#DBDBDB]">
                  <Quote className="text-[#FDD202] w-10 h-10 mb-6" />
                  <p className="text-lg text-black mb-6 flex-grow">“{t.quote}”</p>
                  <div className="flex items-center">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-[#FDD202]"
                    />
                    <div>
                      <p className="font-semibold text-black">{t.name}</p>
                      <p className="text-sm text-gray-600">{t.business}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>

        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </section>
  );
}