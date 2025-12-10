import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import HeroSection from '../components/home/HeroSection';
import FeaturedVans from '../components/home/FeaturedVans';
import TrustSection from '../components/home/TrustSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import CTASection from '../components/home/CTASection';

export default function Home() {
  const { data: vans = [], isLoading } = useQuery({
    queryKey: ['featured-vans'],
    queryFn: () => base44.entities.CoffeeVan.filter({ status: 'active' }, '-created_date', 6),
  });

  return (
    <div>
      <HeroSection />
      <FeaturedVans vans={vans} isLoading={isLoading} />
      <TrustSection />
      <WhyChooseUs />
      <CTASection />
    </div>
  );
}