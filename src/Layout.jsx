import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, Phone, Mail, Coffee, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', page: 'Home' },
    { name: 'Browse Vans', page: 'BrowseVans' },
    { name: 'My Listings', page: 'MyListings' },
    { name: 'About', page: 'About' },
    { name: 'Contact', page: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        :root {
          --tmcg-yellow: #FDD202;
          --tmcg-black: #000000;
          --tmcg-dark: #333333;
          --tmcg-light-grey: #F5F5F5;
          --tmcg-textbox-grey: #DBDBDB;
          --tmcg-border-grey: #969696;
        }
      `}</style>
      
      {/* Top Bar */}
      <div className="bg-black text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:1300746020" className="flex items-center gap-2 hover:text-[#FDD202] transition-colors">
              <Phone className="w-4 h-4" />
              1300 74 60 20
            </a>
            <a href="mailto:info@themobilecoffeegroup.com.au" className="flex items-center gap-2 hover:text-[#FDD202] transition-colors">
              <Mail className="w-4 h-4" />
              info@themobilecoffeegroup.com.au
            </a>
          </div>
          <div className="text-[#969696]">
            Australia's #1 Coffee Van Marketplace
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69146bc33cf928fc6bc5fa52/24e4d88c0_TMCGLogo.png"
                alt="The Mobile Coffee Group"
                className="h-14 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={`text-sm font-medium transition-colors relative group ${
                    currentPageName === item.page
                      ? 'text-[#FDD202]'
                      : 'text-black hover:text-[#FDD202]'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#FDD202] transition-all duration-300 ${
                    currentPageName === item.page ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                to={createPageUrl('ListVan')}
                className="bg-[#FDD202] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#f5c400] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Sell Your Van
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1A1A1A]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1A1A1A]" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                      currentPageName === item.page
                        ? 'bg-[#FDD202] text-black'
                        : 'text-black hover:bg-[#F5F5F5]'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to={createPageUrl('ListVan')}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-black text-white py-4 rounded-lg font-semibold mt-4"
                >
                  Sell Your Van
                </Link>
                <div className="pt-4 border-t space-y-3">
                  <a href="tel:1300746020" className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5" />
                    1300 74 60 20
                  </a>
                  <a href="mailto:info@themobilecoffeegroup.com.au" className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5" />
                    info@themobilecoffeegroup.com.au
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white border-t border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69146bc33cf928fc6bc5fa52/24e4d88c0_TMCGLogo.png"
                alt="The Mobile Coffee Group"
                className="h-16 w-auto mb-6"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
                Australia's leading manufacturer of mobile coffee vans. 
                19+ years of experience helping entrepreneurs start their coffee journey.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-[#FDD202] font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.page}>
                    <Link
                      to={createPageUrl(item.page)}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-[#FDD202] font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <a href="tel:1300746020" className="hover:text-white transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    1300 74 60 20
                  </a>
                </li>
                <li>
                  <a href="mailto:info@themobilecoffeegroup.com.au" className="hover:text-white transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    info@themobilecoffeegroup.com.au
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-[#FDD202] font-semibold mb-6">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-4">
                Get notified about new vans for sale
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F7B500] transition-colors"
                />
                <button className="bg-[#FDD202] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#f5c400] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} The Mobile Coffee Group. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}