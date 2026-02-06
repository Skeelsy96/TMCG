import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Search, ArrowRight, TrendingUp, ShoppingBag, AlertCircle } from 'lucide-react';
import VanCard from '../components/vans/VanCard';
import { motion } from 'framer-motion';

export default function Classifieds() {
  const { data: featuredVans = [], isLoading } = useQuery({
    queryKey: ['featured-classifieds'],
    queryFn: () => base44.entities.CoffeeVan.filter({ status: 'active', featured: true }, '-created_date', 3),
  });

  const { data: recentVans = [] } = useQuery({
    queryKey: ['recent-classifieds'],
    queryFn: () => base44.entities.CoffeeVan.filter({ status: 'active' }, '-created_date', 6),
  });

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Info Banner */}
      <div className="bg-[#FDD202] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 text-black" />
            <span className="text-black font-medium">
              Looking for a brand-new van?{' '}
              <Link to={createPageUrl('NewVans')} className="underline hover:no-underline">
                Explore our New Van Packages
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-black py-20 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#FDD202]/10 border border-[#FDD202]/30 rounded-full px-4 py-2 mb-6">
              <ShoppingBag className="w-4 h-4 text-[#FDD202]" />
              <span className="text-[#FDD202] text-sm font-medium">Pre-Loved Coffee Vans</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Second-Hand Coffee Van <span className="text-[#FDD202]">Marketplace</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Quality pre-loved coffee vans from verified sellers across Australia. 
              Start your mobile coffee business at a fraction of the cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to={createPageUrl('BrowseVans')}
                className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all text-lg"
              >
                <Search className="w-5 h-5" />
                Browse All Vans
              </Link>
              <Link
                to={createPageUrl('ListVan')}
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all text-lg"
              >
                List Your Van
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Listings */}
      {featuredVans.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-[#FDD202]" />
              <h2 className="text-3xl font-bold text-black">Featured Listings</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredVans.map((van) => (
                <VanCard key={van.id} van={van} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Listings */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-8">Recent Listings</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {recentVans.map((van) => (
              <VanCard key={van.id} van={van} />
            ))}
          </div>
          <div className="text-center">
            <Link
              to={createPageUrl('BrowseVans')}
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-[#333333] transition-all"
            >
              View All Listings
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* List Your Van CTA */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to <span className="text-[#FDD202]">Sell Your Van?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            List your coffee van and reach thousands of potential buyers across Australia.
          </p>
          <Link
            to={createPageUrl('ListVan')}
            className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
          >
            List Your Van
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}