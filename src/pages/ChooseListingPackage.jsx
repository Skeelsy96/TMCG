import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Check, ArrowRight, Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const DEFAULT_PACKAGES = [
  {
    code: 'basic',
    name: 'Basic',
    price_aud: 349,
    description: 'Great for a simple listing',
    featured_duration_days: 0,
    social_promotion: 'none',
    features: [
      '1 Pre‑Loved Vans listing'
    ],
  },
  {
    code: 'premium',
    name: 'Premium Package',
    price_aud: 649,
    description: 'Boost visibility with featured placement',
    featured_duration_days: 7,
    social_promotion: 'single_post',
    features: [
      '1 Pre‑Loved Vans listing',
      'Featured for 1 week',
      '1 Social Media Promotion'
    ],
  },
  {
    code: 'vip',
    name: 'Complete VIP Package',
    price_aud: 949,
    description: 'Maximum exposure across our network',
    featured_duration_days: 30,
    social_promotion: 'campaign',
    features: [
      '1 Pre‑Loved Vans listing',
      'Featured for 1 month',
      'Personalised Social Media Campaign'
    ],
  },
];

export default function ChooseListingPackage() {
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ['listing-packages'],
    queryFn: async () => {
      const rows = await base44.entities.PreLovedVanListingPackages.list();
      return rows;
    },
    initialData: [],
  });

  const pkgs = packages.length ? packages : DEFAULT_PACKAGES;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero */}
      <section className="bg-black py-16 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FDD202]/10 border border-[#FDD202]/30 rounded-full px-4 py-2 mb-6">
            <ShoppingBag className="w-4 h-4 text-[#FDD202]" />
            <span className="text-[#FDD202] text-sm font-medium">Select Your Listing Package</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">List Your Van</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose a package that suits your goals. You can complete payment later.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {pkgs.map((p, idx) => (
              <motion.div
                key={p.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`bg-white rounded-2xl border ${p.code === 'vip' ? 'border-[#FDD202]' : 'border-[#DBDBDB]'} shadow-sm overflow-hidden flex flex-col`}
              >
                <div className={`p-6 ${p.code === 'vip' ? 'bg-[#FFF8CC]' : ''}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-black">{p.name}</h3>
                    {p.code === 'vip' && (
                      <span className="inline-flex items-center gap-1 text-[#FDD202] text-sm font-semibold">
                        <Star className="w-4 h-4" /> Most Popular
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-3xl font-extrabold text-black">${p.price_aud.toLocaleString()}</div>
                  <p className="text-[#333333] mt-2">{p.description}</p>
                </div>
                <div className="px-6 pb-6 flex-1">
                  <ul className="space-y-2">
                    {p.features?.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#333333]">
                        <Check className="w-4 h-4 text-green-600 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                    {p.featured_duration_days > 0 && (
                      <li className="flex items-start gap-2 text-sm text-[#333333]">
                        <Check className="w-4 h-4 text-green-600 mt-0.5" />
                        <span>Featured for {p.featured_duration_days >= 30 ? `${Math.round(p.featured_duration_days/30)} month` : `${p.featured_duration_days} days`}</span>
                      </li>
                    )}
                    {p.social_promotion && p.social_promotion !== 'none' && (
                      <li className="flex items-start gap-2 text-sm text-[#333333]">
                        <Check className="w-4 h-4 text-green-600 mt-0.5" />
                        <span>{p.code === 'vip' ? 'Personalised Social Media Campaign' : 'Social Media Promotion'}</span>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <Link to={`${createPageUrl('ListVan')}?package=${p.code}`}>
                    <Button className="w-full bg-[#FDD202] text-black hover:bg-[#f5c400]">
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}