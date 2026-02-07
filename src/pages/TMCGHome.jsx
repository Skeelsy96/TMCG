import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
  ArrowRight, Coffee, Wrench, ShoppingBag, Calendar, 
  DollarSign, BookOpen, CheckCircle, Star, TrendingUp 
} from 'lucide-react';
import { motion } from 'framer-motion';
import LeadEnquiryForm from '../components/tmcg/LeadEnquiryForm';
import BookingSection from '../components/tmcg/BookingSection';
import TestimonialSlider from '../components/tmcg/TestimonialSlider';
import HeroBackgroundVideo from '../components/common/HeroBackgroundVideo';

export default function TMCGHome() {
  const branchCards = [
    {
      title: 'New Van Packages',
      description: 'Custom-built mobile coffee vans designed for your lifestyle and business goals.',
      icon: Coffee,
      link: createPageUrl('NewVans'),
      color: 'from-[#FDD202] to-[#f5c400]'
    },
    {
      title: 'Fit-Out Packages',
      description: 'Transform your existing SUV, ute, or vehicle into a mobile coffee business.',
      icon: Wrench,
      link: createPageUrl('FitOuts'),
      color: 'from-black to-[#333333]'
    },
    {
      title: 'Pre-Loved Coffee Vans',
      description: 'Browse quality second-hand vans from verified sellers across Australia.',
      icon: ShoppingBag,
      link: createPageUrl('Classifieds'),
      color: 'from-[#333333] to-black'
    },
    {
      title: 'Early Bird Coffee',
      description: 'Premium coffee blends engineered specifically for mobile coffee vans.',
      icon: Coffee,
      link: createPageUrl('EarlyBirdCoffee'),
      color: 'from-[#FDD202] to-[#f5c400]'
    },
    {
      title: 'Events & Bookings',
      description: 'Connect with event organisers or join our operator network.',
      icon: Calendar,
      link: createPageUrl('Events'),
      color: 'from-black to-[#333333]'
    },
    {
      title: 'Finance & Business Tools',
      description: 'Flexible finance options and resources to grow your business.',
      icon: DollarSign,
      link: createPageUrl('FinanceOptions'),
      color: 'from-[#333333] to-black'
    }
  ];

  const vanPackages = [
    {
      name: 'Compact Van',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/220ee09c6_SUV7.jpg',
      features: ['Perfect for tight streets', 'School zones & estates', 'Low running costs'],
      link: createPageUrl('CompactVan')
    },
    {
      name: 'Large Van',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/1460956e5_ServeFromRearVans7.png',
      features: ['High-volume service', 'Markets & festivals', 'Multiple staff capacity'],
      link: createPageUrl('LargeVan')
    },
    {
      name: 'Walk-In Van',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/062a79d1b_ProductionFit-out4.jpg',
      features: ['Maximum space', 'Premium events', 'Full interior setup'],
      link: createPageUrl('WalkInVan')
    }
  ];

  // Video sources (Google Drive direct link)
  const DRIVE_FILE_ID = '1RC8yonDAT2FAKq1W3CJZupYw3ET1r89E';
  const desktopVideoSrc = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FDD202' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Background video */}
        <HeroBackgroundVideo
          desktopSrc={desktopVideoSrc}
          poster="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/595190562_Embracing.png"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#FDD202]/10 border border-[#FDD202]/30 rounded-full px-4 py-2 mb-8"
            >
              <Coffee className="w-4 h-4 text-[#FDD202]" />
              <span className="text-[#FDD202] text-sm font-medium">Australia's Premier Mobile Coffee Specialists</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-center">
              Brew More Than Coffee
              <br />
              <span className="text-[#FDD202]">Brew A Lifestyle</span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 leading-relaxed text-center">
              19+ years building mobile coffee businesses. 900+ custom vans delivered. 
              Your journey from dream to first cup starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#enquiry-form"
                className="inline-flex items-center justify-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all text-lg shadow-lg hover:shadow-xl"
              >
                Design My Coffee Van
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to={createPageUrl('Classifieds')}
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all text-lg"
              >
                Browse Second-Hand Vans
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FDD202] mb-2">900+</div>
                <div className="text-gray-400 text-sm">Vans Built</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FDD202] mb-2">19+</div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FDD202] mb-2">1M+ kg</div>
                <div className="text-gray-400 text-sm">Coffee Sold</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Branch Navigation Cards */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Your Mobile Coffee Journey Starts Here
            </h2>
            <p className="text-xl text-[#333333] max-w-3xl mx-auto">
              Choose your path to mobile coffee freedom
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branchCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={card.link}
                  className="group block h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#DBDBDB]"
                >
                  <div className={`h-2 bg-gradient-to-r ${card.color}`} />
                  <div className="p-8">
                    <div className="w-14 h-14 bg-[#FDD202]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FDD202]/20 transition-colors">
                      <card.icon className="w-7 h-7 text-[#FDD202]" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#FDD202] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-[#333333] mb-4">
                      {card.description}
                    </p>
                    <div className="flex items-center gap-2 text-[#FDD202] font-semibold group-hover:gap-3 transition-all">
                      Explore
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Van Packages Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Featured <span className="text-[#FDD202]">Van Packages</span>
            </h2>
            <p className="text-xl text-[#333333] max-w-3xl mx-auto">
              Turn-key solutions designed for your mobile coffee business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {vanPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={pkg.link} className="block">
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                    <img
                      src={pkg.image}
                      alt={`${pkg.name} package - Mobile coffee van solution`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[#333333]">
                        <CheckCircle className="w-5 h-5 text-[#FDD202]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to={createPageUrl('NewVans')}
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-[#333333] transition-all"
            >
              View All Van Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Enquiry Form */}
      <section id="enquiry-form" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Start Your <span className="text-[#FDD202]">Coffee Van Journey</span>
            </h2>
            <p className="text-xl text-gray-400">
              Answer a few quick questions and we'll help you design the perfect van for your lifestyle
            </p>
          </div>
          <LeadEnquiryForm />
        </div>
      </section>

      {/* Booking Section */}
      <BookingSection />

      <TestimonialSlider />

      {/* Trust & Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Trusted By <span className="text-[#FDD202]">Operators Nationwide</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/9c82541a7_3RealEstateVanslinedup2.JPG"
                alt="Fleet of premium TMCG coffee vans"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/a55736403_Walk-InCustomerthumbsup.png"
                alt="Happy coffee van owner testimonial"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}