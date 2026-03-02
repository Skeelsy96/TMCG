import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Search, Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

const RESOURCES_ARTICLES = [
  {
    id: 'complete-guide-buying-coffee-van',
    title: 'The Complete Guide to Buying a Second-Hand Coffee Van',
    excerpt: 'Everything you need to know before purchasing a used mobile coffee business, from inspections to financing.',
    category: 'Buying Guide',
    readTime: '8 min read',
    date: '2025-01-15',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop',
    featured: true,
    vanTypes: ['Large Van', 'Walk-In Van'],
    topics: ['Buying', 'Checklist', 'Due Diligence']
  },
  {
    id: 'maximize-resale-value',
    title: '7 Ways to Maximize Your Coffee Van Resale Value',
    excerpt: 'Expert tips on maintaining and improving your van to get the best price when selling.',
    category: 'Selling Tips',
    readTime: '6 min read',
    date: '2025-01-10',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
    featured: true,
    vanTypes: ['Compact Van', 'Large Van'],
    topics: ['Selling', 'Maintenance', 'Preparation']
  },
  {
    id: 'mobile-coffee-trends-2025',
    title: 'Mobile Coffee Industry Trends for 2025',
    excerpt: 'Stay ahead with insights into emerging trends shaping the mobile coffee business landscape.',
    category: 'Industry News',
    readTime: '5 min read',
    date: '2025-01-05',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop',
    featured: true,
    vanTypes: ['All'],
    topics: ['Trends', 'Sustainability', 'Technology']
  },
  {
    id: 'coffee-van-inspection-checklist',
    title: 'Coffee Van Inspection Checklist: What to Look For',
    excerpt: 'A comprehensive checklist for evaluating a used coffee van before you buy.',
    category: 'Buying Guide',
    readTime: '10 min read',
    date: '2024-12-28',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
    vanTypes: ['SUV', 'Ute', 'Large Van'],
    topics: ['Inspection', 'Buying', 'Checklist']
  },
  {
    id: 'financing-options-coffee-van',
    title: 'Financing Options for Your Coffee Van Purchase',
    excerpt: 'Explore different ways to finance your mobile coffee business dream.',
    category: 'Finance',
    readTime: '7 min read',
    date: '2024-12-20',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop',
    vanTypes: ['All'],
    topics: ['Finance', 'Loans', 'Leasing']
  },
  {
    id: 'building-coffee-van-business',
    title: 'How to Build a Successful Coffee Van Business',
    excerpt: 'Essential strategies for running a profitable mobile coffee operation.',
    category: 'Business Tips',
    readTime: '12 min read',
    date: '2024-12-15',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&auto=format&fit=crop',
    vanTypes: ['All'],
    topics: ['Operations', 'Marketing', 'Growth']
  },
  {
    id: 'complete-van-package-guide',
    title: 'The Complete Van Package Guide',
    excerpt: 'Everything you need to know about choosing the right van package for your mobile coffee business.',
    category: 'Buying Guide',
    readTime: '10 min read',
    date: '2025-01-20',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop',
    vanTypes: ['Compact Van', 'Large Van', 'Walk-In Van'],
    topics: ['Packages', 'Planning']
  },
  {
    id: 'pylontech-battery-guide',
    title: 'Pylontech Battery System: Complete Guide',
    excerpt: 'Everything you need to know about Pylontech 48V lithium battery systems for mobile coffee vans.',
    category: 'Equipment Guide',
    readTime: '7 min read',
    date: '2025-01-12',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
    vanTypes: ['Compact Van', 'Large Van', 'Walk-In Van'],
    topics: ['Power', 'Equipment', 'Sustainability']
  },
  {
    id: 'carimali-nimble-guide',
    title: 'Carimali Nimble Espresso Machine Guide',
    excerpt: 'Master your Carimali Nimble espresso machine with this complete operation and maintenance guide.',
    category: 'Equipment Guide',
    readTime: '6 min read',
    date: '2025-01-08',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
    vanTypes: ['All'],
    topics: ['Equipment', 'Barista', 'Maintenance']
  }
];
  {
    id: 'complete-guide-buying-coffee-van',
    title: 'The Complete Guide to Buying a Second-Hand Coffee Van',
    excerpt: 'Everything you need to know before purchasing a used mobile coffee business, from inspections to financing.',
    category: 'Buying Guide',
    readTime: '8 min read',
    date: '2025-01-15',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'maximize-resale-value',
    title: '7 Ways to Maximize Your Coffee Van Resale Value',
    excerpt: 'Expert tips on maintaining and improving your van to get the best price when selling.',
    category: 'Selling Tips',
    readTime: '6 min read',
    date: '2025-01-10',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'mobile-coffee-trends-2025',
    title: 'Mobile Coffee Industry Trends for 2025',
    excerpt: 'Stay ahead with insights into emerging trends shaping the mobile coffee business landscape.',
    category: 'Industry News',
    readTime: '5 min read',
    date: '2025-01-05',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'coffee-van-inspection-checklist',
    title: 'Coffee Van Inspection Checklist: What to Look For',
    excerpt: 'A comprehensive checklist for evaluating a used coffee van before you buy.',
    category: 'Buying Guide',
    readTime: '10 min read',
    date: '2024-12-28',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
  },
  {
    id: 'financing-options-coffee-van',
    title: 'Financing Options for Your Coffee Van Purchase',
    excerpt: 'Explore different ways to finance your mobile coffee business dream.',
    category: 'Finance',
    readTime: '7 min read',
    date: '2024-12-20',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop',
  },
  {
    id: 'building-coffee-van-business',
    title: 'How to Build a Successful Coffee Van Business',
    excerpt: 'Essential strategies for running a profitable mobile coffee operation.',
    category: 'Business Tips',
    readTime: '12 min read',
    date: '2024-12-15',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&auto=format&fit=crop',
  },
];

const CATEGORIES = ['All', 'Buying Guide', 'Selling Tips', 'Industry News', 'Finance', 'Business Tips', 'Equipment Guide'];

export default function ResourcesGuides() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVanType, setSelectedVanType] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const vanTypes = ['All', ...Array.from(new Set(RESOURCES_ARTICLES.flatMap(a => a.vanTypes || [])))];
  const topics = ['All', ...Array.from(new Set(RESOURCES_ARTICLES.flatMap(a => a.topics || [])))];

  const filteredArticles = RESOURCES_ARTICLES.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesVan = selectedVanType === 'All' || (article.vanTypes || []).includes(selectedVanType) || selectedVanType === 'All';
    const matchesTopic = selectedTopic === 'All' || (article.topics || []).includes(selectedTopic) || selectedTopic === 'All';
    return matchesSearch && matchesCategory && matchesVan && matchesTopic;
  });

  const featuredArticles = RESOURCES_ARTICLES.filter(a => a.featured);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* SEO Meta Tags - handled in head */}
      
      {/* Hero */}
      <section className="bg-black py-16 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Resources <span className="text-[#FDD202]">&amp; Guides</span>
            </h1>
            <p className="text-[#969696] text-lg max-w-2xl mx-auto mb-8">
              Expert guides, industry insights, and tips for buying, selling, and running a successful mobile coffee business
            </p>
            
            {/* Search */}
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
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
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

        {/* Advanced Filters */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Van Type</label>
            <Select value={selectedVanType} onValueChange={setSelectedVanType}>
              <SelectTrigger className="bg-white border-[#DBDBDB]">
                <SelectValue placeholder="All Van Types" />
              </SelectTrigger>
              <SelectContent>
                {vanTypes.map(v => (
                  <SelectItem key={v} value={v}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Topic</label>
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger className="bg-white border-[#DBDBDB]">
                <SelectValue placeholder="All Topics" />
              </SelectTrigger>
              <SelectContent>
                {topics.map(t => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Articles */}
        {selectedCategory === 'All' && searchQuery === '' && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-[#FDD202]" />
              <h2 className="text-2xl font-bold text-black">Featured Articles</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group border border-[#DBDBDB]"
                >
                  <Link to={createPageUrl('BlogArticle') + `?id=${article.id}`}>
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={article.image}
                        alt={`${article.title} - Guide for mobile coffee van business`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-[#FDD202] text-black">
                        {article.category}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-black mb-3 group-hover:text-[#FDD202] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-[#333333] mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-[#969696]">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.date).toLocaleDateString('en-AU', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* All Articles */}
        <section>
          <h2 className="text-2xl font-bold text-black mb-8">
            {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
          </h2>
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group border border-[#DBDBDB]"
                >
                  <Link to={createPageUrl('BlogArticle') + `?id=${article.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={`${article.title} - Coffee van resource article`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-[#FDD202] text-black">
                        {article.category}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-[#FDD202] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-[#333333] text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-[#969696]">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.date).toLocaleDateString('en-AU', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#DBDBDB]">
              <p className="text-[#969696] text-lg">No articles found matching your search.</p>
            </div>
          )}
        </section>

        {/* Community CTA */}
        <section className="mt-16">
          <div className="bg-white border border-[#DBDBDB] rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-black mb-3">Share Your Van Build Story or Testimonial</h3>
            <p className="text-[#333333] mb-6 max-w-2xl mx-auto">Inspire the community by sharing your journey, lessons learned, and photos of your setup. Selected stories may be featured.</p>
            <Link to={createPageUrl('SubmitStory')} className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#f5c400] transition-colors">
              Submit Your Story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}