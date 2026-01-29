import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Coffee, CheckCircle, ArrowRight, Award, Zap, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function EarlyBirdCoffee() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list()
  });

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <section className="bg-black py-20 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center">

            <div className="inline-flex items-center gap-2 bg-[#FDD202]/10 border border-[#FDD202]/30 rounded-full px-4 py-2 mb-6">
              <Coffee className="w-4 h-4 text-[#FDD202]" />
              <span className="text-[#FDD202] text-sm font-medium">In-House Roastery</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Early Bird <span className="text-[#FDD202]">Coffee</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Premium coffee blends engineered specifically for mobile coffee vans. 
              AA Grade beans, roasted weekly on-demand, designed for consistency in mobile environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Early Bird */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Why <span className="text-[#FDD202]">Early Bird?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FDD202]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#FDD202]" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">AA Grade Beans</h3>
              <p className="text-[#333333]">Only the highest quality beans from trusted sources</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FDD202]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-[#FDD202]" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Mobile-Optimised</h3>
              <p className="text-[#333333]">Blends engineered for consistency in mobile setups</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FDD202]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#FDD202]" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Roasted Weekly</h3>
              <p className="text-[#333333]">Fresh roasts delivered on your schedule</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-black">Our Products</h2>
            <Link
              to={createPageUrl('Cart')}
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold border border-[#DBDBDB] hover:shadow-lg transition-all">

              <ShoppingCart className="w-5 h-5" />
              View Cart
            </Link>
          </div>

          {isLoading ?
          <div className="text-center py-12 text-[#969696]">Loading products...</div> :
          products.length === 0 ?
          <div className="text-center py-12 text-[#969696]">No products available</div> :

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product, index) =>
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}>

                  <Link
                to={createPageUrl('ProductDetail') + `?id=${product.id}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-[#DBDBDB] hover:shadow-xl transition-all h-full">

                    {product.image &&
                <div className="relative h-48 bg-[#F5F5F5] overflow-hidden">
                        <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                      </div>
                }
                    <div className="p-6">
                      <div className="text-xs text-[#FDD202] font-semibold mb-2 uppercase">{product.category}</div>
                      <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#FDD202] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#333333] mb-4 line-clamp-2">{product.description}</p>
                      
                      {product.size_options && product.size_options.length > 0 &&
                  <div className="text-sm text-[#969696] mb-3">
                          From ${Math.min(...product.size_options.map((s) => s.price)).toFixed(2)}
                        </div>
                  }

                      <div className="flex items-center gap-2 text-[#FDD202] font-semibold group-hover:gap-3 transition-all">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
            )}
            </div>
          }
        </div>
      </section>

      {/* Order CTA */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to <span className="text-[#FDD202]">Order?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Browse our full range of products, add items to your cart, and place your order online. 
            Fast delivery Australia-wide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={createPageUrl('Cart')}
              className="inline-flex items-center justify-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all">

              <ShoppingCart className="w-5 h-5" />
              View Cart & Checkout
            </Link>
            <Link
              to={createPageUrl('TMCGContact')}
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all">

              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Support & <span className="text-[#FDD202]">Training</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#F5F5F5] rounded-2xl p-8 border border-[#DBDBDB]">
              <h3 className="text-xl font-bold text-black mb-4">Barista Training</h3>
              <p className="text-[#333333] mb-4">
                Complimentary training videos and guides to perfect your coffee-making skills.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[#333333]">
                  <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                  Espresso fundamentals
                </li>
                <li className="flex items-center gap-2 text-[#333333]">
                  <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                  Milk texturing techniques
                </li>
                <li className="flex items-center gap-2 text-[#333333]">
                  <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                  Equipment maintenance
                </li>
              </ul>
            </div>
            <div className="bg-[#F5F5F5] rounded-2xl p-8 border border-[#DBDBDB]">
              <h3 className="text-xl font-bold text-black mb-4">Technical Support</h3>
              <p className="text-[#333333] mb-4">
                Ongoing help with equipment, recipes, and troubleshooting from our expert team.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[#333333]">
                  <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                  Equipment setup guides
                </li>
                <li className="flex items-center gap-2 text-[#333333]">
                  <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                  Recipe optimization
                </li>
                <li className="flex items-center gap-2 text-[#333333]">
                  <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                  Direct support line
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>);

}