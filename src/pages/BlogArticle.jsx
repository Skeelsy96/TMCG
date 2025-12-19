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
  },
  'complete-van-package-guide': {
    title: 'The Complete Van Package Guide',
    category: 'Buying Guide',
    readTime: '10 min read',
    date: '2025-01-20',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&auto=format&fit=crop',
    excerpt: 'Everything you need to know about choosing the right van package for your mobile coffee business.',
    content: `
      <p>Choosing the right van package is one of the most important decisions you'll make for your mobile coffee business. This comprehensive guide breaks down everything you need to know.</p>

      <h2>Understanding Van Package Types</h2>
      <p>There are three main categories of coffee van packages:</p>

      <h3>1. Compact Van Packages</h3>
      <p>Perfect for solo operators or those focusing on residential areas, school zones, and construction sites.</p>
      <ul>
        <li><strong>Base Vehicles:</strong> SUVs (Mitsubishi Outlander, Nissan X-Trail, Toyota Kluger)</li>
        <li><strong>Serving Capacity:</strong> 50-100 coffees per day</li>
        <li><strong>Investment Range:</strong> $60,000 - $90,000</li>
        <li><strong>Best For:</strong> Part-time operators, tight access locations, lower volume sites</li>
      </ul>

      <h3>2. Large Van Packages</h3>
      <p>The most popular option for full-time operators serving markets, events, and high-traffic locations.</p>
      <ul>
        <li><strong>Base Vehicles:</strong> Mercedes Sprinter, Ford Transit, Renault Master</li>
        <li><strong>Serving Capacity:</strong> 150-300 coffees per day</li>
        <li><strong>Investment Range:</strong> $120,000 - $180,000</li>
        <li><strong>Best For:</strong> Full-time operators, markets, festivals, corporate events</li>
      </ul>

      <h3>3. Walk-In Van Packages</h3>
      <p>Premium setups for high-volume operations and multi-barista teams.</p>
      <ul>
        <li><strong>Base Vehicles:</strong> Large box trucks, converted trucks</li>
        <li><strong>Serving Capacity:</strong> 300+ coffees per day</li>
        <li><strong>Investment Range:</strong> $180,000 - $250,000+</li>
        <li><strong>Best For:</strong> High-volume events, permanent locations, multi-operator setups</li>
      </ul>

      <h2>What's Included in a Standard Package</h2>
      <p>All TMCG packages come with turn-key solutions including:</p>
      <ul>
        <li>Commercial-grade espresso machine (Carimali Nimble or similar)</li>
        <li>Professional coffee grinder</li>
        <li>Water filtration system</li>
        <li>Fresh and waste water tanks (80-200L depending on size)</li>
        <li>Power system (generator, battery, or hybrid)</li>
        <li>Refrigeration</li>
        <li>Full fit-out with benches, storage, and serving window</li>
        <li>Health department compliance</li>
        <li>Basic equipment and supplies</li>
        <li>Barista training</li>
      </ul>

      <h2>Power Systems Explained</h2>
      <p>One of the most critical components is your power system:</p>

      <h3>Generator Systems</h3>
      <ul>
        <li>Most affordable option</li>
        <li>Reliable and proven</li>
        <li>Requires fuel and regular maintenance</li>
        <li>Can be noisy</li>
      </ul>

      <h3>Battery Systems (Pylontech)</h3>
      <ul>
        <li>Silent operation</li>
        <li>Eco-friendly</li>
        <li>Higher upfront cost</li>
        <li>Ideal for noise-restricted areas</li>
      </ul>

      <h3>Hybrid Systems</h3>
      <ul>
        <li>Best of both worlds</li>
        <li>Battery for quiet operation, generator backup</li>
        <li>Maximum flexibility</li>
      </ul>

      <h2>Optional Upgrades to Consider</h2>
      <p>Enhance your package with these popular additions:</p>
      <ul>
        <li><strong>Solar panels:</strong> $3,000 - $6,000</li>
        <li><strong>POS system:</strong> $1,500 - $3,000</li>
        <li><strong>Upgraded espresso machine:</strong> $5,000 - $15,000</li>
        <li><strong>Second grinder:</strong> $2,000 - $4,000</li>
        <li><strong>Extended water capacity:</strong> $1,000 - $2,000</li>
        <li><strong>Custom branding/wrap:</strong> $3,000 - $8,000</li>
      </ul>

      <h2>Making Your Decision</h2>
      <p>Consider these factors when choosing your package:</p>
      <ul>
        <li><strong>Target Market:</strong> Where will you primarily operate?</li>
        <li><strong>Volume Expectations:</strong> How many coffees per day do you plan to serve?</li>
        <li><strong>Budget:</strong> What can you afford including operational costs?</li>
        <li><strong>Growth Plans:</strong> Do you plan to expand or hire staff?</li>
        <li><strong>Location Restrictions:</strong> Are you limited by size or noise?</li>
      </ul>

      <h2>Financing Your Van</h2>
      <p>Most operators finance their coffee van purchase. Typical options include:</p>
      <ul>
        <li>Commercial vehicle loans (5-7 year terms)</li>
        <li>Equipment financing</li>
        <li>Business loans</li>
        <li>TMCG's preferred finance partners</li>
      </ul>

      <h2>Conclusion</h2>
      <p>The right van package aligns with your business goals, budget, and operational needs. Take time to discuss your specific requirements with our team—we've helped hundreds of operators find their perfect setup.</p>
    `
  },
  'pylontech-battery-guide': {
    title: 'Pylontech Battery System: Complete Guide',
    category: 'Equipment Guide',
    readTime: '7 min read',
    date: '2025-01-12',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop',
    excerpt: 'Everything you need to know about Pylontech 48V lithium battery systems for mobile coffee vans.',
    content: `
      <p>Pylontech battery systems are revolutionizing mobile coffee operations with silent, eco-friendly power. Here's your complete guide to this game-changing technology.</p>

      <h2>What is Pylontech?</h2>
      <p>Pylontech manufactures high-quality lithium iron phosphate (LiFePO4) battery systems specifically designed for commercial applications. Their 48V modular systems are perfect for mobile coffee vans.</p>

      <h2>System Components</h2>
      <p>A typical Pylontech setup for coffee vans includes:</p>
      <ul>
        <li><strong>Battery Modules:</strong> Stackable 48V units (typically 2-4 modules)</li>
        <li><strong>Battery Management System (BMS):</strong> Monitors and protects the batteries</li>
        <li><strong>Inverter:</strong> Converts DC to AC power for equipment</li>
        <li><strong>Charging System:</strong> Shore power and/or solar input</li>
        <li><strong>Monitoring Display:</strong> Real-time power usage and battery status</li>
      </ul>

      <h2>Capacity and Performance</h2>
      <p>Understanding what Pylontech can power:</p>

      <h3>Standard 2-Module Setup (9.6kWh)</h3>
      <ul>
        <li>Run time: 4-6 hours of continuous coffee making</li>
        <li>Coffees per charge: 150-200</li>
        <li>Best for: Part-time operations, quiet locations</li>
      </ul>

      <h3>Large 4-Module Setup (19.2kWh)</h3>
      <ul>
        <li>Run time: 8-10 hours of continuous operation</li>
        <li>Coffees per charge: 300-400</li>
        <li>Best for: Full-day markets, festivals, events</li>
      </ul>

      <h2>Key Advantages</h2>
      <ul>
        <li><strong>Silent Operation:</strong> Perfect for noise-sensitive areas (hospitals, schools, offices)</li>
        <li><strong>Zero Emissions:</strong> Environmentally friendly, no fumes</li>
        <li><strong>Low Maintenance:</strong> No oil changes, spark plugs, or fuel</li>
        <li><strong>Long Lifespan:</strong> 6,000+ charge cycles (10+ years)</li>
        <li><strong>Consistent Power:</strong> Stable voltage throughout discharge</li>
        <li><strong>Premium Image:</strong> Appeals to eco-conscious customers</li>
      </ul>

      <h2>Charging Options</h2>

      <h3>Shore Power (Standard)</h3>
      <p>Plug into any 240V outlet for overnight charging:</p>
      <ul>
        <li>Full charge time: 4-6 hours</li>
        <li>Can charge at home, venue, or depot</li>
        <li>Most cost-effective charging method</li>
      </ul>

      <h3>Solar Panels (Optional)</h3>
      <p>Add solar for extended operation and emergency backup:</p>
      <ul>
        <li>Typical setup: 2-4 x 400W panels</li>
        <li>Provides 1-3 hours additional runtime per day</li>
        <li>Great for multi-day festivals</li>
        <li>Reduces charging costs</li>
      </ul>

      <h2>Operating Costs</h2>
      <p>Pylontech systems have significantly lower operating costs than generators:</p>

      <h3>Daily Charging Cost</h3>
      <ul>
        <li>2-module system: $2-3 per full charge</li>
        <li>4-module system: $4-6 per full charge</li>
        <li>Compare to: $15-25 per day for generator fuel</li>
      </ul>

      <h3>Annual Savings</h3>
      <ul>
        <li>Fuel savings: $3,000-5,000 per year</li>
        <li>Maintenance savings: $500-1,000 per year</li>
        <li>Total annual savings: $3,500-6,000</li>
      </ul>

      <h2>Best Use Cases</h2>
      <p>Pylontech systems excel in these scenarios:</p>
      <ul>
        <li>Corporate offices and business parks</li>
        <li>Hospital and medical center catering</li>
        <li>School and university campuses</li>
        <li>Indoor events and venues</li>
        <li>Residential areas with noise restrictions</li>
        <li>Premium events requiring silent service</li>
      </ul>

      <h2>Maintenance Tips</h2>
      <p>Keep your system running optimally:</p>
      <ul>
        <li>Regular charge cycles (don't let it fully discharge)</li>
        <li>Keep batteries at moderate temperatures (avoid extreme heat/cold)</li>
        <li>Check connections and terminals quarterly</li>
        <li>Monitor battery health through the BMS</li>
        <li>Annual professional inspection recommended</li>
      </ul>

      <h2>Is Pylontech Right for You?</h2>
      <p>Consider Pylontech if you:</p>
      <ul>
        <li>Target noise-sensitive locations</li>
        <li>Value sustainability and eco-friendly operations</li>
        <li>Want premium positioning for your brand</li>
        <li>Prefer low ongoing operational costs</li>
        <li>Have access to regular charging facilities</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Pylontech battery systems represent the future of mobile coffee operations. While the upfront investment is higher than traditional generators, the operational savings, environmental benefits, and access to premium locations make it an excellent choice for serious operators.</p>
    `
  },
  'carimali-nimble-guide': {
    title: 'Carimali Nimble Espresso Machine Guide',
    category: 'Equipment Guide',
    readTime: '6 min read',
    date: '2025-01-08',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop',
    excerpt: 'Master your Carimali Nimble espresso machine with this complete operation and maintenance guide.',
    content: `
      <p>The Carimali Nimble is the workhorse of mobile coffee operations—compact, reliable, and capable of producing exceptional espresso. This guide covers everything you need to know.</p>

      <h2>Machine Overview</h2>
      <p>The Carimali Nimble is specifically designed for mobile and compact operations:</p>
      <ul>
        <li><strong>Boiler Capacity:</strong> 5.5L</li>
        <li><strong>Groups:</strong> 2-group configuration</li>
        <li><strong>Power:</strong> 2.4kW (compatible with battery systems)</li>
        <li><strong>Dimensions:</strong> 680mm W x 520mm D x 530mm H</li>
        <li><strong>Weight:</strong> 48kg</li>
      </ul>

      <h2>Daily Startup Procedure</h2>
      <p>Follow this routine for optimal performance:</p>
      <ol>
        <li><strong>Check water supply:</strong> Ensure adequate fresh water</li>
        <li><strong>Power on:</strong> Turn on machine and allow 15-20 minutes warm-up</li>
        <li><strong>Purge groups:</strong> Run water through both group heads</li>
        <li><strong>Check pressure:</strong> Verify brew pressure at 9 bars</li>
        <li><strong>Flush steam wand:</strong> Clear any residue</li>
        <li><strong>Test shot:</strong> Pull a test espresso to check extraction</li>
      </ol>

      <h2>Extraction Basics</h2>
      <p>Achieving the perfect shot:</p>

      <h3>Dose and Distribution</h3>
      <ul>
        <li>Single shot: 9-10g</li>
        <li>Double shot: 18-20g</li>
        <li>Level grounds evenly in portafilter</li>
        <li>Tamp with consistent 15kg pressure</li>
      </ul>

      <h3>Extraction Time</h3>
      <ul>
        <li>Target time: 25-30 seconds</li>
        <li>Yield: 30-40ml for double shot</li>
        <li>Appearance: Rich, tiger-striped crema</li>
      </ul>

      <h3>Troubleshooting Extraction</h3>
      <ul>
        <li><strong>Too fast (under 20s):</strong> Grind finer or increase dose</li>
        <li><strong>Too slow (over 35s):</strong> Grind coarser or decrease dose</li>
        <li><strong>Bitter taste:</strong> Lower water temperature or shorter extraction</li>
        <li><strong>Sour taste:</strong> Increase water temperature or longer extraction</li>
      </ul>

      <h2>Steam Wand Technique</h2>
      <p>Perfect milk texturing:</p>

      <h3>Stretching Phase (0-5 seconds)</h3>
      <ul>
        <li>Position wand just below milk surface</li>
        <li>Introduce air with gentle "chirping" sound</li>
        <li>Aim for 20-30% volume increase</li>
      </ul>

      <h3>Texturing Phase (5-15 seconds)</h3>
      <ul>
        <li>Submerge wand deeper to create whirlpool</li>
        <li>No more air introduction</li>
        <li>Heat to 60-65°C (140-150°F)</li>
      </ul>

      <h3>Final Result</h3>
      <ul>
        <li>Glossy, paint-like consistency</li>
        <li>No large bubbles</li>
        <li>Sweet taste, not scalded</li>
      </ul>

      <h2>Daily Cleaning Routine</h2>
      <p>Maintain quality and longevity:</p>

      <h3>During Service</h3>
      <ul>
        <li>Purge group heads between shots</li>
        <li>Wipe steam wand immediately after each use</li>
        <li>Keep drip tray emptied</li>
        <li>Wipe down machine exterior regularly</li>
      </ul>

      <h3>End of Day</h3>
      <ul>
        <li><strong>Backflush groups:</strong> Use blind basket and cleaner</li>
        <li><strong>Clean steam wand:</strong> Soak in hot water, scrub tip</li>
        <li><strong>Remove portafilters:</strong> Clean and soak baskets</li>
        <li><strong>Empty drip tray:</strong> Clean thoroughly</li>
        <li><strong>Wipe down:</strong> Clean all surfaces</li>
      </ul>

      <h2>Weekly Maintenance</h2>
      <ul>
        <li>Deep clean group heads and gaskets</li>
        <li>Descale steam wand internally</li>
        <li>Check and clean shower screens</li>
        <li>Verify all seals and gaskets</li>
        <li>Clean grinder burrs</li>
      </ul>

      <h2>Monthly Maintenance</h2>
      <ul>
        <li>Replace group head gaskets if worn</li>
        <li>Deep clean water system</li>
        <li>Check pump pressure</li>
        <li>Lubricate moving parts</li>
        <li>Professional service check (recommended)</li>
      </ul>

      <h2>Common Issues and Solutions</h2>

      <h3>No Water Flow</h3>
      <ul>
        <li>Check water supply</li>
        <li>Verify pump operation</li>
        <li>Inspect for blockages in group head</li>
        <li>Check shower screen isn't clogged</li>
      </ul>

      <h3>Low Pressure</h3>
      <ul>
        <li>Adjust pump pressure (requires technician)</li>
        <li>Check for leaks in system</li>
        <li>Clean or replace shower screen</li>
        <li>Descale if necessary</li>
      </ul>

      <h3>Steam Wand Not Working</h3>
      <ul>
        <li>Check boiler pressure (should be 1.2 bar)</li>
        <li>Clean steam tip blockage</li>
        <li>Verify steam valve operation</li>
        <li>Check for scale buildup</li>
      </ul>

      <h2>Performance Optimization</h2>
      <p>Get the most from your Nimble:</p>
      <ul>
        <li>Use filtered water to reduce scale</li>
        <li>Maintain consistent water temperature (92-94°C)</li>
        <li>Keep machine clean and well-maintained</li>
        <li>Use fresh, properly stored coffee beans</li>
        <li>Dial in grinder for each new batch of beans</li>
        <li>Preheat cups for better temperature retention</li>
      </ul>

      <h2>When to Call a Technician</h2>
      <p>Professional service needed for:</p>
      <ul>
        <li>Pressure adjustments</li>
        <li>Pump replacement</li>
        <li>Boiler issues</li>
        <li>Electrical problems</li>
        <li>Temperature control issues</li>
        <li>Annual comprehensive service</li>
      </ul>

      <h2>Conclusion</h2>
      <p>The Carimali Nimble is a reliable, powerful machine that will serve you well with proper care. Master the basics, maintain a strict cleaning schedule, and you'll produce consistently excellent coffee that keeps customers coming back.</p>
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