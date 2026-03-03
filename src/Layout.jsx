import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { base44 } from '@/api/base44Client';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Polyfill: make SVGElement.className writable so external editors can set it safely
if (typeof window !== 'undefined' && 'SVGElement' in window) {
  const ensureAssignable = (el) => {
    try {
      // Try direct write; if it throws, define instance-level accessor
      try { el.className = el.getAttribute('class') || ''; return; } catch {}
      Object.defineProperty(el, 'className', {
        get() { return this.getAttribute('class') || ''; },
        set(v) { this.setAttribute('class', String(v)); },
        configurable: true
      });
    } catch {}
  };

  try {
    const __svgTest = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // Some browsers throw when assigning string to className on SVG
    __svgTest.className = 'x';
  } catch (_) {
    // Fallback: try to patch prototype so future writes succeed
    try {
      Object.defineProperty(window.SVGElement.prototype, 'className', {
        get() { return this.getAttribute('class') || ''; },
        set(v) { this.setAttribute('class', String(v)); },
        configurable: true
      });
    } catch {}
  }

  // Patch existing SVG nodes
  try {
    document.querySelectorAll('svg, svg *').forEach(ensureAssignable);
  } catch {}

  // Observe new nodes and patch on the fly
  try {
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes || []) {
          if (node.nodeType !== 1) continue;
          if (node.namespaceURI === 'http://www.w3.org/2000/svg') ensureAssignable(node);
          try { node.querySelectorAll && node.querySelectorAll('svg, svg *').forEach(ensureAssignable); } catch {}
        }
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  } catch {}
}

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const ok = await base44.auth.isAuthenticated();
      if (ok) {
        const me = await base44.auth.me();
        setAuthUser(me);
      }
    })();
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    // If there's a hash, let the browser handle scrolling to the element
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [location.pathname, location.search]);

  const navigation = [
  { name: 'Home', page: 'TMCGHome' },
  { name: 'New Packages', page: 'NewPackages' },
  { name: 'Pre-Loved Vans', page: 'Classifieds' },
  { name: 'Early Bird Coffee', page: 'EarlyBirdCoffee' },
  { name: 'Events', page: 'Events' },
  { name: 'Finance Options', page: 'FinanceOptions' },
  { name: 'Resources & Guides', page: 'Blog' },
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
    <div className="min-h-screen bg-white" key={location.key}>
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
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
          {/* Left: contacts */}
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
          {/* Center: tagline */}
          <div className="text-center text-[#969696]">
            Australia's Premier Mobile Coffee Van Specialists
          </div>
          {/* Right: login/account */}
          <div className="flex justify-end">
            {authUser ? (
              <Link to={createPageUrl('Account')} className="hover:text-[#FDD202] transition-colors">
                {authUser.full_name || authUser.email}
              </Link>
            ) : (
              <button
                onClick={() => base44.auth.redirectToLogin(createPageUrl('Account'))}
                className="hover:text-[#FDD202] transition-colors"
              >
                Log in
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={createPageUrl('TMCGHome')} className="flex items-center flex-shrink-0">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69146bc33cf928fc6bc5fa52/24e4d88c0_TMCGLogo.png"
                alt="The Mobile Coffee Group - Australia's leading coffee van manufacturer and marketplace" className="px-1 h-14 w-14 object-contain" />


            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-5 flex-1 justify-center">
              {navigation.map((item) =>
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`text-sm font-medium transition-colors relative group whitespace-nowrap ${
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
      <main className="pb-24">{children}</main>

      {/* Floating CTAs */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-t border-[#969696] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={scrollToEnquiry}
              className="bg-[#FDD202] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#f5c400] transition-all shadow-lg">

              Enquire Now
            </button>
            {['Classifieds','BrowseVans','VanDetail','ListVan','MyListings'].includes(currentPageName) ? (
              <Link
                to={createPageUrl('ChooseListingPackage')}
                className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg">
                List Your Van
              </Link>
            ) : (
              <Link
                to={createPageUrl('VanConfigurator')}
                className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg">
                Build Your Van
              </Link>
            )}
            <Link
              to={createPageUrl('BookCall')}
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg">
              Book a Call
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white border-t border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69146bc33cf928fc6bc5fa52/24e4d88c0_TMCGLogo.png"
                alt="The Mobile Coffee Group"
                className="h-12 w-12 object-contain mb-4" />

              <p className="text-gray-400 text-sm leading-relaxed mb-2">
                Brew More Than Coffee. Brew A Lifestyle.
              </p>
              <p className="text-gray-500 text-xs">
                Australia's premier mobile coffee van specialists with 19+ years of experience.
              </p>
            </div>

            {/* Van Packages */}
            <div>
              <h3 className="text-[#FDD202] font-semibold mb-4 text-sm">Van Packages</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to={createPageUrl('NewPackages')} className="text-gray-400 hover:text-white transition-colors">New Packages</Link></li>
                <li><Link to={createPageUrl('Classifieds')} className="text-gray-400 hover:text-white transition-colors">Pre-Loved Vans</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-[#FDD202] font-semibold mb-4 text-sm">Services</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to={createPageUrl('EarlyBirdCoffee')} className="text-gray-400 hover:text-white transition-colors">Early Bird Coffee</Link></li>
                <li><Link to={createPageUrl('Events')} className="text-gray-400 hover:text-white transition-colors">Events Network</Link></li>
                <li><Link to={createPageUrl('FinanceOptions')} className="text-gray-400 hover:text-white transition-colors">Finance Options</Link></li>
                <li><Link to={createPageUrl('Blog')} className="text-gray-400 hover:text-white transition-colors">Resources & Guides</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-[#FDD202] font-semibold mb-4 text-sm">Contact Us</h3>
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

          <div className="border-t border-white/10 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} The Mobile Coffee Group. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}