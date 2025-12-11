import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Search, FileText, Download, ExternalLink, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const RESOURCES = [
  {
    title: 'The Complete Van Package Guide',
    category: 'New Vans & Fit-Outs',
    type: 'PDF Guide',
    description: 'Comprehensive overview of all van packages, inclusions, and options.',
    link: '#'
  },
  {
    title: 'Business Starter Guide',
    category: 'Running Your Business',
    type: 'PDF Guide',
    description: 'Your complete roadmap to starting and running a successful mobile coffee business.',
    link: '#',
    featured: true
  },
  {
    title: 'Cash Flow Projection Template',
    category: 'Downloads & Templates',
    type: 'Excel Template',
    description: 'Plan your finances with our pre-built cash flow projection spreadsheet.',
    link: '#'
  },
  {
    title: 'Complete Guide to Buying a Second-Hand Van',
    category: 'Second-Hand Vans',
    type: 'Article',
    description: 'Everything you need to know before purchasing a used mobile coffee business.',
    link: createPageUrl('BlogArticle') + '?id=complete-guide-buying-coffee-van'
  },
  {
    title: '7 Ways to Maximize Resale Value',
    category: 'Second-Hand Vans',
    type: 'Article',
    description: 'Expert tips on maintaining and improving your van to get the best price when selling.',
    link: createPageUrl('BlogArticle') + '?id=maximize-resale-value'
  },
  {
    title: 'Pylontech Battery System Guide',
    category: 'Equipment & Tech',
    type: 'Technical Doc',
    description: 'Everything about our 48v lithium battery stacks and power management.',
    link: '#'
  },
  {
    title: 'Carimali Nimble Espresso Machine',
    category: 'Equipment & Tech',
    type: 'Equipment Guide',
    description: 'Operation manual and maintenance guide for our premium espresso machine.',
    link: '#'
  },
  {
    title: 'Mobile Coffee Industry Trends 2025',
    category: 'Running Your Business',
    type: 'Article',
    description: 'Stay ahead with insights into emerging trends shaping the mobile coffee landscape.',
    link: createPageUrl('BlogArticle') + '?id=mobile-coffee-trends-2025'
  }
];

const CATEGORIES = ['All', 'New Vans & Fit-Outs', 'Second-Hand Vans', 'Running Your Business', 'Equipment & Tech', 'Downloads & Templates'];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = RESOURCES.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <section className="bg-black py-20 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Resources & <span className="text-[#FDD202]">Knowledge Hub</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Guides, templates, and expert knowledge to help you succeed in mobile coffee
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#969696]" />
                <Input
                  type="search"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-white border-[#DBDBDB] text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[#FDD202] text-black'
                  : 'bg-white text-[#333333] border border-[#969696] hover:border-[#FDD202]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#DBDBDB] hover:shadow-lg transition-all group"
            >
              {resource.featured && (
                <Badge className="bg-[#FDD202] text-black mb-4">Featured</Badge>
              )}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[#FDD202]/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#FDD202]" />
                </div>
                <Badge variant="outline" className="text-xs">{resource.type}</Badge>
              </div>
              <h3 className="text-xl font-bold text-black mb-2 group-hover:text-[#FDD202] transition-colors">
                {resource.title}
              </h3>
              <p className="text-[#333333] text-sm mb-4">{resource.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs text-[#969696]">{resource.category}</Badge>
                {resource.link.startsWith('http') || resource.link.startsWith(createPageUrl('')) ? (
                  <Link
                    to={resource.link}
                    className="inline-flex items-center gap-1 text-[#FDD202] text-sm font-semibold hover:gap-2 transition-all"
                  >
                    {resource.type.includes('Template') || resource.type.includes('PDF') ? 'Download' : 'Read'}
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                ) : (
                  <span className="text-[#969696] text-sm">Coming soon</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}