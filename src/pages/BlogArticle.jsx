import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, Calendar, Clock, Share2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample article content database
const ARTICLES = {
  'complete-guide-buying-coffee-van': {
    title: 'The Complete Guide to Buying a Second-Hand Coffee Van',
    category: 'Buying Guide',
    readTime: '8 min read',
    date: '2025-01-15',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&auto=format&fit=crop',
    excerpt: 'Everything you need to know before purchasing a used mobile coffee business, from inspections to financing.',
    content: `
      <p>Buying a second-hand coffee van is an exciting venture that can launch your mobile coffee business at a fraction of the cost of a new setup. However, it's crucial to approach this investment with knowledge and caution.</p>

      <h2>1. Determine Your Budget</h2>
      <p>Before you start browsing listings, establish a realistic budget that includes:</p>
      <ul>
        <li>Purchase price of the van</li>
        <li>Registration and transfer costs</li>
        <li>Insurance (vehicle and public liability)</li>
        <li>Initial stock and supplies</li>
        <li>Emergency repair fund (10-15% of purchase price)</li>
      </ul>

      <h2>2. Essential Features to Look For</h2>
      <p>A quality coffee van should include:</p>
      <ul>
        <li><strong>Professional espresso machine</strong> - Look for reputable brands like La Marzocco, Synesso, or Rancilio</li>
        <li><strong>Commercial-grade grinder</strong> - Essential for consistent coffee quality</li>
        <li><strong>Adequate water supply</strong> - Minimum 80-100L fresh water capacity</li>
        <li><strong>Reliable power source</strong> - Generator, battery system, or hybrid setup</li>
        <li><strong>Food safety compliance</strong> - Proper sinks, storage, and ventilation</li>
      </ul>

      <h2>3. Inspection Checklist</h2>
      <p>Never skip a thorough inspection. Check:</p>
      <ul>
        <li>Vehicle engine and transmission condition</li>
        <li>Chassis and body for rust or damage</li>
        <li>All coffee equipment functionality</li>
        <li>Electrical and plumbing systems</li>
        <li>Gas lines and connections (if applicable)</li>
        <li>Tires, brakes, and suspension</li>
      </ul>

      <h2>4. Documentation Requirements</h2>
      <p>Request and verify:</p>
      <ul>
        <li>Service history and maintenance records</li>
        <li>Current registration and roadworthy certificate</li>
        <li>Food authority compliance certificates</li>
        <li>Equipment warranties and manuals</li>
        <li>Previous business performance records (if available)</li>
      </ul>

      <h2>5. Negotiation Tips</h2>
      <p>Use any issues found during inspection as negotiation points. Consider:</p>
      <ul>
        <li>Getting quotes for necessary repairs before finalizing price</li>
        <li>Requesting inclusion of spare parts or extra equipment</li>
        <li>Asking for seller training on equipment operation</li>
      </ul>

      <h2>6. Financing Options</h2>
      <p>If you need financing, explore:</p>
      <ul>
        <li>Business equipment loans</li>
        <li>Commercial vehicle financing</li>
        <li>Small business grants and incentives</li>
        <li>Peer-to-peer lending platforms</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Purchasing a second-hand coffee van requires careful research and due diligence, but with the right approach, you can find an excellent van that becomes the foundation of a successful mobile coffee business. Take your time, ask questions, and don't rush into a decision.</p>

      <p><strong>Ready to start your search?</strong> Browse our current listings of quality used coffee vans from verified sellers across Australia.</p>
    `
  },
  'maximize-resale-value': {
    title: '7 Ways to Maximize Your Coffee Van Resale Value',
    category: 'Selling Tips',
    readTime: '6 min read',
    date: '2025-01-10',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop',
    excerpt: 'Expert tips on maintaining and improving your van to get the best price when selling.',
    content: `
      <p>When it's time to sell your coffee van, proper preparation can significantly increase its market value. Here are seven proven strategies to maximize your return on investment.</p>

      <h2>1. Maintain Impeccable Service Records</h2>
      <p>Keep detailed documentation of all maintenance and repairs. Buyers pay premium prices for vans with comprehensive service history, as it demonstrates proper care and helps them anticipate future costs.</p>

      <h2>2. Deep Clean Everything</h2>
      <p>A spotless van sells faster and for more money. This includes:</p>
      <ul>
        <li>Professional exterior wash and polish</li>
        <li>Deep clean of all coffee equipment</li>
        <li>Sanitize all food preparation surfaces</li>
        <li>Clean or replace any worn floor mats</li>
        <li>Detail the driver's cabin</li>
      </ul>

      <h2>3. Address Minor Repairs</h2>
      <p>Fix small issues before listing. Buyers will use any defects as negotiation leverage, often overestimating repair costs. Consider:</p>
      <ul>
        <li>Repairing scratches or dents</li>
        <li>Fixing leaky taps or pumps</li>
        <li>Replacing burnt-out lights</li>
        <li>Servicing the espresso machine</li>
      </ul>

      <h2>4. Upgrade Key Equipment</h2>
      <p>Strategic upgrades can significantly boost value:</p>
      <ul>
        <li>Install a modern POS system</li>
        <li>Upgrade to LED lighting</li>
        <li>Add a quality water filtration system</li>
        <li>Include spare parts and accessories</li>
      </ul>

      <h2>5. Professional Photography</h2>
      <p>Quality photos are crucial for online listings. Invest in professional photos that showcase:</p>
      <ul>
        <li>Exterior from multiple angles</li>
        <li>Interior workspace and equipment</li>
        <li>Coffee machine and preparation area</li>
        <li>Storage areas and features</li>
        <li>The van in action at an event (if possible)</li>
      </ul>

      <h2>6. Gather All Documentation</h2>
      <p>Prepare a comprehensive information package including:</p>
      <ul>
        <li>Service and maintenance records</li>
        <li>Equipment manuals and warranties</li>
        <li>Registration and compliance certificates</li>
        <li>Supplier contacts and relationships</li>
        <li>Historical revenue data (if comfortable sharing)</li>
      </ul>

      <h2>7. Time Your Sale Strategically</h2>
      <p>List your van during peak buying seasons:</p>
      <ul>
        <li><strong>Spring (September-November)</strong> - Buyers preparing for summer events</li>
        <li><strong>New Year (January-February)</strong> - People pursuing new business ventures</li>
        <li>Avoid winter months when mobile coffee business slows down</li>
      </ul>

      <h2>Conclusion</h2>
      <p>By following these strategies, you can position your coffee van as a premium offering in the marketplace. Remember, buyers are not just purchasing equipment—they're investing in their business dreams. Present your van as the perfect opportunity for their success.</p>
    `
  },
  'mobile-coffee-trends-2025': {
    title: 'Mobile Coffee Industry Trends for 2025',
    category: 'Industry News',
    readTime: '5 min read',
    date: '2025-01-05',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&auto=format&fit=crop',
    excerpt: 'Stay ahead with insights into emerging trends shaping the mobile coffee business landscape.',
    content: `
      <p>The mobile coffee industry continues to evolve rapidly. Here are the key trends shaping 2025 and beyond.</p>

      <h2>1. Sustainability Takes Center Stage</h2>
      <p>Eco-conscious consumers are driving demand for sustainable practices:</p>
      <ul>
        <li>Solar-powered coffee vans gaining popularity</li>
        <li>Compostable cups and packaging becoming standard</li>
        <li>Single-origin and ethically-sourced beans</li>
        <li>Reduced waste through reusable cup incentives</li>
      </ul>

      <h2>2. Technology Integration</h2>
      <p>Digital solutions are revolutionizing mobile coffee operations:</p>
      <ul>
        <li>Contactless payment systems (essential)</li>
        <li>Mobile ordering apps for pre-orders</li>
        <li>GPS tracking for customer notifications</li>
        <li>Social media integration for live location sharing</li>
        <li>Inventory management software</li>
      </ul>

      <h2>3. Specialty Coffee Goes Mobile</h2>
      <p>Quality expectations continue to rise:</p>
      <ul>
        <li>High-end espresso machines in mobile setups</li>
        <li>Barista championship winners running mobile businesses</li>
        <li>Alternative milk options (oat, almond, soy) as standard</li>
        <li>Cold brew and specialty drinks expanding menus</li>
      </ul>

      <h2>4. Event-Based Operations</h2>
      <p>Strategic event catering is more lucrative than ever:</p>
      <ul>
        <li>Corporate event catering growing 40% year-over-year</li>
        <li>Wedding and private party bookings increasing</li>
        <li>Festival and market circuits offering stable income</li>
        <li>Partnerships with event venues and planners</li>
      </ul>

      <h2>5. Health and Wellness Focus</h2>
      <p>Consumers want more than just caffeine:</p>
      <ul>
        <li>Sugar-free and low-calorie options</li>
        <li>Functional additives (collagen, CBD where legal)</li>
        <li>Organic and health-focused menu items</li>
        <li>Transparency in ingredients and sourcing</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Staying ahead of these trends is crucial for mobile coffee business success in 2025. Operators who adapt to changing consumer preferences and embrace new technologies will thrive in this competitive market.</p>
    `
  }
};

export default function BlogArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id');
  const article = ARTICLES[articleId];

  // Update page title and meta tags
  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Coffee Van Classifieds`;
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Article not found</h1>
          <Link to={createPageUrl('Blog')} className="text-[#FDD202] hover:underline">
            Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Back Button */}
      <div className="bg-white border-b border-[#DBDBDB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to={createPageUrl('Blog')}
            className="inline-flex items-center gap-2 text-[#333333] hover:text-[#FDD202] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Resources
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <Badge className="bg-[#FDD202] text-black mb-4">{article.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-[#969696] mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(article.date).toLocaleDateString('en-AU', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {article.readTime}
            </div>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: article.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="flex items-center gap-2 hover:text-[#FDD202] transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img
            src={article.image}
            alt={`${article.title} - Coffee van industry guide and tips`}
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-black
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[#333333] prose-p:leading-relaxed prose-p:mb-6
            prose-ul:text-[#333333] prose-ul:my-6
            prose-li:mb-2
            prose-strong:text-black prose-strong:font-semibold
            prose-a:text-[#FDD202] prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-black to-[#333333] rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Coffee Van?
          </h3>
          <p className="text-[#969696] mb-8 text-lg">
            Browse our current listings or get in touch with our team for personalized advice
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={createPageUrl('BrowseVans')}
              className="inline-flex items-center justify-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-colors"
            >
              Browse Listings
            </Link>
            <Link
              to={createPageUrl('Contact')}
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-[#F5F5F5] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}