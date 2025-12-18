import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Coffee, MapPin, Search, CheckCircle, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import TMCGVerifiedBadge from '../components/common/TMCGVerifiedBadge';

export default function BrowseOperators() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const { data: operators = [], isLoading } = useQuery({
    queryKey: ['operators'],
    queryFn: () => base44.entities.OperatorProfile.list('-created_date', 100)
  });

  const filteredOperators = operators.filter(op => {
    const matchesSearch = !searchQuery || 
      op.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = !selectedState || op.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <section className="bg-black py-16 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Coffee Van <span className="text-[#FDD202]">Operators</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Connect with verified mobile coffee operators across Australia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-white border-b border-[#DBDBDB] py-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search operators or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="sm:w-48">
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All States</SelectItem>
                <SelectItem value="NSW">NSW</SelectItem>
                <SelectItem value="VIC">VIC</SelectItem>
                <SelectItem value="QLD">QLD</SelectItem>
                <SelectItem value="SA">SA</SelectItem>
                <SelectItem value="WA">WA</SelectItem>
                <SelectItem value="TAS">TAS</SelectItem>
                <SelectItem value="NT">NT</SelectItem>
                <SelectItem value="ACT">ACT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Operators Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <p className="text-[#333333]">
              {filteredOperators.length} operator{filteredOperators.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <Coffee className="w-16 h-16 text-[#FDD202] animate-pulse mx-auto mb-4" />
              <p className="text-[#333333]">Loading operators...</p>
            </div>
          ) : filteredOperators.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#DBDBDB]">
              <Coffee className="w-16 h-16 text-[#969696] mx-auto mb-4" />
              <p className="text-[#333333]">No operators found matching your criteria</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOperators.map((operator, index) => (
                <motion.div
                  key={operator.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={createPageUrl('OperatorProfile') + `?operatorId=${operator.id}`}
                    className="block bg-white rounded-2xl overflow-hidden border border-[#DBDBDB] hover:shadow-lg transition-all group"
                  >
                    {operator.profile_image && (
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={operator.profile_image}
                          alt={operator.business_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {!operator.available_for_booking && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                            Unavailable
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-black group-hover:text-[#FDD202] transition-colors mb-1">
                            {operator.business_name}
                          </h3>
                          <p className="text-sm text-[#333333]">{operator.operator_name}</p>
                        </div>
                        {operator.built_by_tmcg && <TMCGVerifiedBadge size="sm" />}
                      </div>

                      {operator.verified && (
                        <div className="flex items-center gap-1 text-[#FDD202] text-sm mb-3">
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </div>
                      )}

                      <p className="text-[#333333] text-sm line-clamp-2 mb-4">
                        {operator.bio}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-[#333333]">
                        <MapPin className="w-4 h-4 text-[#FDD202]" />
                        {operator.location}, {operator.state}
                      </div>

                      {operator.services_offered?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {operator.services_offered.slice(0, 3).map((service, idx) => (
                            <span key={idx} className="text-xs bg-[#F5F5F5] text-[#333333] px-2 py-1 rounded">
                              {service}
                            </span>
                          ))}
                          {operator.services_offered.length > 3 && (
                            <span className="text-xs text-[#969696]">+{operator.services_offered.length - 3} more</span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Are You A Coffee Van <span className="text-[#FDD202]">Operator?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join our operator network and get connected with events across Australia
          </p>
          <Link
            to={createPageUrl('OperatorApplication')}
            className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
          >
            <Plus className="w-5 h-5" />
            Apply to Join Network
          </Link>
        </div>
      </section>
    </div>
  );
}