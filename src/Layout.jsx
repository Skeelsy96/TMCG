import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, Phone, Mail, Coffee, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
  { name: 'Home', page: 'TMCGHome' },
  { name: 'New Van Packages', page: 'NewVans' },
  { name: 'Fit-Out Packages', page: 'FitOuts' },
  { name: 'Pre-Loved Vans', page: 'Classifieds' },
  { name: 'Early Bird Coffee', page: 'EarlyBirdCoffee' },
  { name: 'Events', page: 'Events' },
  { name: 'Finance Options', page: 'FinanceOptions' },
  { name: 'Resources', page: 'Resources' },
  { name: 'About', page: 'TMCGAbout' },
  { name: 'Contact', page: 'TMCGContact' }];


  const scrollToEnquiry = () => {
    const form = document.getElementById('enquiry-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = createPageUrl('TMCGHome') + '#enquiry-form';
    }
  };

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
            Australia's Premier Mobile Coffee Van Specialists
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <nav className="sm:px- lg:px- max-w-8xl sm:px-5 lg:px-8">
          <div className="bg-transparent w w- w-m w-ma flex justify-between items-center h-20 w-100">
            {/* Logo */}
            <Link to={createPageUrl('TMCGHome')} className="flex items-center">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69146bc33cf928fc6bc5fa52/24e4d88c0_TMCGLogo.png"
                alt="The Mobile Coffee Group - Australia's leading coffee van manufacturer and marketplace"
                className="h-14 w-auto" />

            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-">
              {navigation.map((item) =>
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`text-sm font-medium transition-colors relative group ${
                currentPageName === item.page ?
                'text-[#FDD202]' :
                'text-black hover:text-[#FDD202]'}`
                }>

                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#FDD202] transition-all duration-300 ${
                currentPageName === item.page ? 'w-full' : 'w-0 group-hover:w-full'}`
                } />
                </Link>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={scrollToEnquiry}
                className="bg-[#FDD202] text-black px-5 py-2.5 rounded-full font-semibold hover:bg-[#f5c400] transition-all">

                Enquire Now
              </button>
              <Link
                to={createPageUrl('BookCall')}
                className="bg-black text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#333333] transition-all">

                Book a Call
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">

              {mobileMenuOpen ?
              <X className="w-6 h-6 text-black" /> :

              <Menu className="w-6 h-6 text-black" />
              }
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t overflow-hidden">

              <div className="px-4 py-6 space-y-4">
                {navigation.map((item) =>
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                currentPageName === item.page ?
                'bg-[#FDD202] text-black' :
                'text-black hover:bg-[#F5F5F5]'}`
                }>

                    {item.name}
                  </Link>
              )}
                <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToEnquiry();
                }}
                className="block w-full text-center bg-[#FDD202] text-black py-3 rounded-lg font-semibold">

                  Enquire Now
                </button>
                <Link
                to={createPageUrl('BookCall')}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-black text-white py-3 rounded-lg font-semibold">

                  Book a Call
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
          }
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
                className="h-16 w-auto mb-6" />

              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Brew More Than Coffee. Brew A Lifestyle.
              </p>
              <p className="text-gray-500 text-xs">
                Australia's premier mobile coffee van specialists with 19+ years of experience.
              </p>
            </div>

            {/* Van Packages */}
            <div>
              <h3 className="text-[#FDD202] font-semibold mb-6">Van Packages</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to={createPageUrl('NewVans')} className="text-gray-400 hover:text-white transition-colors">New Van Packages</Link></li>
                <li><Link to={createPageUrl('FitOuts')} className="text-gray-400 hover:text-white transition-colors">Fit-Out Packages</Link></li>
                <li><Link to={createPageUrl('Classifieds')} className="text-gray-400 hover:text-white transition-colors">Pre-Loved Vans</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-[#FDD202] font-semibold mb-6">Services</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to={createPageUrl('EarlyBirdCoffee')} className="text-gray-400 hover:text-white transition-colors">Early Bird Coffee</Link></li>
                <li><Link to={createPageUrl('Events')} className="text-gray-400 hover:text-white transition-colors">Events Network</Link></li>
                <li><Link to={createPageUrl('FinanceOptions')} className="text-gray-400 hover:text-white transition-colors">Finance Options</Link></li>
                <li><Link to={createPageUrl('Resources')} className="text-gray-400 hover:text-white transition-colors">Resources</Link></li>
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
    </div>);

}