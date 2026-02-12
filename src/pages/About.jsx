import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Award, Users, Coffee, Truck, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const milestones = [
  { number: '19+', label: 'Years in Business', icon: Award },
  { number: '900+', label: 'Coffee Vans Built', icon: Truck },
  { number: '1M+', label: 'KG Coffee Sold', icon: Coffee },
  { number: '100s', label: 'Happy Customers', icon: Users }];


  const values = [
  {
    title: 'Quality Craftsmanship',
    description: 'Every van we build and list meets our high standards for quality and reliability.'
  },
  {
    title: 'Industry Expertise',
    description: 'With nearly two decades of experience, we know what makes a great coffee van.'
  },
  {
    title: 'Community Focus',
    description: 'We\'re building a community of go-getters and coffee entrepreneurs across Australia.'
  },
  {
    title: 'Trust & Transparency',
    description: 'Honest listings, fair dealings, and support throughout your buying journey.'
  }];


  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-black py-20 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About <span className="text-[#FDD202]">Our Pre-Loved Mobile Coffee Vans</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">The Mobile Coffee Group not only builds Brand-New custom coffee vans, we are also dedicated to connecting buyers and sellers of quality second-hand coffee vans across Australia.


              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={createPageUrl('BrowseVans')}
                  className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#f5c400] transition-colors">

                  Browse Vans
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to={createPageUrl('ListVan')}
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  List Your Van ->
                </Link>
                <Link
                  to={createPageUrl('Contact')}
                  className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">

                  Contact Us
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative">

              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69146bc33cf928fc6bc5fa52/24e4d88c0_TMCGLogo.png"
                alt="The Mobile Coffee Group"
                className="w-full max-w-md mx-auto" />

            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((item, index) =>
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center">

                <div className="w-16 h-16 bg-[#F7B500]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-[#F7B500]" />
                </div>
                <div className="text-4xl font-bold text-[#1A1A1A] mb-2">{item.number}</div>
                <div className="text-gray-500">{item.label}</div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-[#F5F5F5] border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}>

              <h2 className="text-3xl font-bold text-black mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Phil, Director and Owner of The Mobile Coffee Group, started his career as a young 
                  mobile coffee van entrepreneur himself. Starting with his first van in his early 20's, 
                  Phil quickly built a successful business and expanded into owning a fleet of coffee vans 
                  throughout Sydney's Northern Beaches.
                </p>
                <p>
                  He developed a strong passion for the mobile coffee industry and decided to venture 
                  into coffee van manufacturing as well as coffee bean importation and roasting.
                </p>
                <p>
                  For the past <strong>19+ years</strong>, Phil has been leading the charge; standing 
                  proudly at the forefront of Australia's mobile coffee industry. He has manufactured 
                  over <strong>900 Mobile Coffee Vans and Vehicles</strong> and sold over 
                  <strong> 1,000,000kg</strong> of his 'Early Bird' Coffee across the country; helping 
                  hundreds of people to reach their goal of establishing their own successful Mobile 
                  Coffee Business.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative">

              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop"
                  alt="Coffee Van"
                  className="w-full h-full object-cover" />

              </div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12">

            <h2 className="text-3xl font-bold text-black mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              What drives us every day to help Australians achieve their mobile coffee dreams
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) =>
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 p-6 rounded-2xl border border-[#969696] hover:border-[#FDD202] hover:shadow-lg transition-all duration-300">

                <div className="w-12 h-12 bg-[#FDD202]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-[#FDD202]" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black border-t border-[#969696]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Coffee Journey?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Whether you're buying your first van or upgrading your setup, we're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={createPageUrl('BrowseVans')}
              className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-colors">

              Browse Available Vans
            </Link>
            <Link
              to={createPageUrl('ListVan')}
              className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">

              Sell Your Van
            </Link>
          </div>
        </div>
      </section>
    </div>);

}