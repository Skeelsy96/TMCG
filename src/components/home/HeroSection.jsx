import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Search, MapPin, Coffee, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const states = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#1A1A1A]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FDD202' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-transparent" />

      {/* Coffee Van Image */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/595190562_Embracing.png"
          alt="Coffee Van"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#FDD202]/10 border border-[#FDD202]/30 rounded-full px-4 py-2 mb-8"
          >
            <Coffee className="w-4 h-4 text-[#FDD202]" />
            <span className="text-[#FDD202] text-sm font-medium">Australia's #1 Coffee Van Marketplace</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Find Your Perfect{' '}
            <span className="text-[#FDD202]">Mobile Coffee</span>{' '}
            Business
          </h1>

          <p className="text-xl text-gray-400 mb-10 leading-relaxed">
            Browse quality second-hand coffee vans from across Australia. 
            Start your coffee empire or upgrade your existing setup.
          </p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-2 shadow-2xl"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search coffee vans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FDD202]/50 bg-white border border-[#DBDBDB]"
                />
              </div>
              <div className="relative sm:w-48">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full appearance-none pl-12 pr-10 py-4 rounded-xl bg-[#DBDBDB] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FDD202]/50 cursor-pointer border border-[#969696]"
                >
                  <option value="">All States</option>
                  {states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <Link
                to={createPageUrl('BrowseVans') + `?search=${searchQuery}&state=${selectedState}`}
                className="bg-[#FDD202] text-black px-8 py-4 rounded-xl font-semibold hover:bg-[#f5c400] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Search className="w-5 h-5" />
                Search
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-8 mt-12"
          >
            <div>
              <div className="text-3xl font-bold text-[#FDD202]">900+</div>
              <div className="text-[#969696] text-sm">Vans Built</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FDD202]">19+</div>
              <div className="text-[#969696] text-sm">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FDD202]">Australia</div>
              <div className="text-[#969696] text-sm">Wide Coverage</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}