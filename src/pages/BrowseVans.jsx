import React, { useState, useMemo, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Grid, List, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import VanCard from '../components/vans/VanCard';
import VanFilters from '../components/vans/VanFilters';
import { motion } from 'framer-motion';

export default function BrowseVans() {
  const urlParams = new URLSearchParams(window.location.search);
  
  const [filters, setFilters] = useState({
    search: urlParams.get('search') || '',
    state: urlParams.get('state') || '',
    Vehicle_type: '',
    Vehicle_Make: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    maxKms: '',
    power_source: '',
    water_system_type: '',
    built_by_tmcg: false,
  });
  const [sortBy, setSortBy] = useState('-created_date');
  const [viewMode, setViewMode] = useState('grid');

  const { data: vans = [], isLoading } = useQuery({
    queryKey: ['vans'],
    queryFn: () => base44.entities.PreLovedVanListings.filter({ status: 'active' }, '-created_date', 100),
  });

  const filteredVans = useMemo(() => {
    let result = [...vans];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(van => 
        van.title?.toLowerCase().includes(searchLower) ||
        van.description?.toLowerCase().includes(searchLower) ||
        van.location?.toLowerCase().includes(searchLower)
      );
    }

    // State filter
    if (filters.state) {
      result = result.filter(van => van.state === filters.state);
    }

    // Vehicle type filter
    if (filters.Vehicle_type) {
      result = result.filter(van => van.Vehicle_type === filters.Vehicle_type);
    }

    // Condition filter
    if (filters.condition) {
      result = result.filter(van => van.condition === filters.condition);
    }

    // Price filters
    if (filters.minPrice) {
      result = result.filter(van => van.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(van => van.price <= Number(filters.maxPrice));
    }

    // Built by TMCG filter
    if (filters.built_by_tmcg) {
      result = result.filter(van => van.built_by_tmcg === true);
    }

    // Advanced filters
    if (filters.Vehicle_Make) {
      result = result.filter(van => van.Vehicle_Make === filters.Vehicle_Make);
    }
    if (filters.minYear) {
      result = result.filter(van => van.year_built >= Number(filters.minYear));
    }
    if (filters.maxYear) {
      result = result.filter(van => van.year_built <= Number(filters.maxYear));
    }
    if (filters.maxKms) {
      result = result.filter(van => (van.Kms || 0) <= Number(filters.maxKms));
    }
    if (filters.power_source) {
      result = result.filter(van => van.power_source === filters.power_source);
    }
    if (filters.water_system_type) {
      result = result.filter(van => van.water_system_type === filters.water_system_type);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return (a.price || 0) - (b.price || 0);
        case 'price_desc':
          return (b.price || 0) - (a.price || 0);
        case '-created_date':
        default:
          return new Date(b.created_date) - new Date(a.created_date);
      }
    });

    return result;
  }, [vans, filters, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      state: '',
      Vehicle_type: '',
      Vehicle_Make: '',
      condition: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      maxKms: '',
      power_source: '',
      water_system_type: '',
      built_by_tmcg: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Browse <span className="text-[#FDD202]">Pre‑Loved Van Listings</span>
          </h1>
          <p className="text-gray-400 text-lg">
            {filteredVans.length} {filteredVans.length === 1 ? 'listing' : 'listings'} available across Australia
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <VanFilters 
            filters={filters} 
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="lg:hidden">
                <VanFilters 
                  filters={filters} 
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearFilters}
                />
              </div>
              
              <div className="flex items-center gap-4 ml-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-created_date">Newest First</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex items-center gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-black text-white' : ''}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-black text-white' : ''}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            {isLoading ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-56 bg-gray-200" />
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-8 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredVans.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}
              >
                {filteredVans.map((van, index) => (
                  <motion.div
                    key={van.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <VanCard van={van} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Coffee className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No vans found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}