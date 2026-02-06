import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
  Plus, Eye, Edit, Trash2, Star, Clock, Check, X, 
  TrendingUp, DollarSign, MapPin 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TMCGVerifiedBadge from '../components/common/TMCGVerifiedBadge';

export default function MyListings() {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const { data: myListings = [], isLoading } = useQuery({
    queryKey: ['my-listings', user?.email],
    queryFn: () => base44.entities.PreLovedVanListings.filter({ created_by: user.email }, '-created_date'),
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.PreLovedVanListings.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-listings'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.PreLovedVanListings.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-listings'] });
    },
  });

  const toggleFeatured = (van) => {
    updateMutation.mutate({
      id: van.id,
      data: { featured: !van.featured }
    });
  };

  const changeStatus = (van, newStatus) => {
    updateMutation.mutate({
      id: van.id,
      data: { status: newStatus }
    });
  };

  const stats = {
    total: myListings.length,
    active: myListings.filter(v => v.status === 'active').length,
    pending: myListings.filter(v => v.status === 'pending').length,
    sold: myListings.filter(v => v.status === 'sold').length,
    totalViews: myListings.reduce((sum, v) => sum + (v.views || 0), 0),
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Please log in to view your listings</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-black py-12 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                My <span className="text-[#FDD202]">Listings</span>
              </h1>
              <p className="text-[#969696]">Manage your listings</p>
            </div>
            <Link
              to={createPageUrl('ListVan')}
              className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#f5c400] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create New Listing
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="border-[#969696]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#333333]">Total Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="border-[#969696]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#333333]">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>
          <Card className="border-[#969696]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#333333]">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card className="border-[#969696]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#333333]">Sold</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.sold}</div>
            </CardContent>
          </Card>
          <Card className="border-[#969696]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#333333]">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#FDD202]">{stats.totalViews}</div>
            </CardContent>
          </Card>
        </div>

        {/* Listings */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : myListings.length > 0 ? (
          <div className="space-y-4">
            {myListings.map((van) => (
              <Card key={van.id} className="border-[#969696] overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="lg:w-64 h-48 lg:h-auto relative overflow-hidden">
                    <img
                      src={van.main_image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop'}
                      alt={van.title}
                      className="w-full h-full object-cover"
                    />
                    {van.built_by_tmcg && (
                      <div className="absolute top-3 left-3">
                        <TMCGVerifiedBadge size="sm" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-black">{van.title}</h3>
                          {van.featured && (
                            <Badge className="bg-[#FDD202] text-black">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-[#333333] mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {van.location}, {van.state}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {van.views || 0} views
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            ${van.price?.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge 
                            variant="outline" 
                            className={
                              van.status === 'active' ? 'border-green-500 text-green-700' :
                              van.status === 'pending' ? 'border-yellow-500 text-yellow-700' :
                              van.status === 'sold' ? 'border-blue-500 text-blue-700' :
                              'border-gray-500 text-gray-700'
                            }
                          >
                            {van.status}
                          </Badge>
                          {van.Vehicle_type && (
                            <Badge variant="outline">{van.Vehicle_type}</Badge>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 ml-4">
                        <Link
                          to={createPageUrl('VanDetail') + `?id=${van.id}`}
                          className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors"
                          title="View listing"
                        >
                          <Eye className="w-5 h-5 text-[#333333]" />
                        </Link>
                        <button
                          onClick={() => toggleFeatured(van)}
                          className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors"
                          title="Toggle featured"
                        >
                          <Star className={`w-5 h-5 ${van.featured ? 'fill-[#FDD202] text-[#FDD202]' : 'text-[#969696]'}`} />
                        </button>
                        
                        {/* Status Change */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors" title="Change status">
                              <TrendingUp className="w-5 h-5 text-[#333333]" />
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Change Listing Status</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <Select
                                defaultValue={van.status}
                                onValueChange={(value) => changeStatus(van, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="sold">Sold</SelectItem>
                                  <SelectItem value="expired">Expired</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* Delete */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="p-2 rounded-lg hover:bg-red-50 transition-colors" title="Delete listing">
                              <Trash2 className="w-5 h-5 text-red-500" />
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Listing</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete "{van.title}"? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button
                                variant="destructive"
                                onClick={() => deleteMutation.mutate(van.id)}
                              >
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16 border-[#969696]">
            <div className="w-20 h-20 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-[#969696]" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">No listings yet</h3>
            <p className="text-[#333333] mb-6">Create your first listing to start selling</p>
            <Link
              to={createPageUrl('ListVan')}
              className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#f5c400] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Listing
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}