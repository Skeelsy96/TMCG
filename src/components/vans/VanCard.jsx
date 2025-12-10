import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { MapPin, Calendar, Eye, Star, Coffee } from 'lucide-react';

export default function VanCard({ van }) {
  return (
    <Link
      to={createPageUrl('VanDetail') + `?id=${van.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={van.main_image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop'}
          alt={van.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Featured Badge */}
        {van.featured && (
          <div className="absolute top-4 left-4 bg-[#F7B500] text-[#1A1A1A] px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star className="w-4 h-4" />
            Featured
          </div>
        )}

        {/* Status Badge */}
        {van.status === 'sold' && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white text-2xl font-bold tracking-wider">SOLD</span>
          </div>
        )}

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-2xl font-bold text-[#1A1A1A]">
              ${van.price?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Views */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <Eye className="w-4 h-4" />
          {van.views || 0}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3 group-hover:text-[#F7B500] transition-colors line-clamp-2">
          {van.title}
        </h3>
        
        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {van.location}, {van.state}
          </div>
          {van.year_built && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {van.year_built}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {van.van_type && (
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium capitalize">
              {van.van_type}
            </span>
          )}
          {van.condition && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              van.condition === 'excellent' ? 'bg-green-100 text-green-700' :
              van.condition === 'good' ? 'bg-blue-100 text-blue-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {van.condition}
            </span>
          )}
          {van.coffee_machine && (
            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Coffee className="w-3 h-3" />
              {van.coffee_machine}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}