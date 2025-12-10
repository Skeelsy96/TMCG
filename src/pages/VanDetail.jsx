import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
  MapPin, Calendar, Eye, Phone, Mail, ChevronLeft, ChevronRight, 
  Star, Share2, Heart, Coffee, Zap, Droplets, Check, X
} from 'lucide-react';
import TMCGVerifiedBadge, { TMCGVerifiedSeal } from '../components/common/TMCGVerifiedBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';

export default function VanDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const vanId = urlParams.get('id');
  const queryClient = useQueryClient();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const { data: van, isLoading, error } = useQuery({
    queryKey: ['van', vanId],
    queryFn: () => base44.entities.CoffeeVan.filter({ id: vanId }),
    select: (data) => data[0],
    enabled: !!vanId,
  });

  // Increment view count
  const viewMutation = useMutation({
    mutationFn: async () => {
      if (van) {
        await base44.entities.CoffeeVan.update(van.id, { views: (van.views || 0) + 1 });
      }
    },
  });

  useEffect(() => {
    if (van && !viewMutation.isSuccess) {
      viewMutation.mutate();
    }

    // Add structured data for SEO
    if (van) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": van.title,
        "image": van.images || [van.main_image],
        "description": van.description,
        "brand": {
          "@type": "Brand",
          "name": van.Vehicle_Make || "Coffee Van"
        },
        "offers": {
          "@type": "Offer",
          "url": window.location.href,
          "priceCurrency": "AUD",
          "price": van.price,
          "itemCondition": `https://schema.org/${van.condition === 'excellent' ? 'NewCondition' : van.condition === 'good' ? 'UsedCondition' : 'RefurbishedCondition'}`,
          "availability": van.status === 'active' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "seller": {
            "@type": "Organization",
            "name": "Coffee Van Classifieds"
          }
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Year Built",
            "value": van.year_built
          },
          {
            "@type": "PropertyValue",
            "name": "Location",
            "value": `${van.location}, ${van.state}`
          },
          {
            "@type": "PropertyValue",
            "name": "Vehicle Type",
            "value": van.Vehicle_type
          }
        ].filter(p => p.value)
      });
      document.head.appendChild(script);

      // Update page title and meta
      document.title = `${van.title} - ${van.location}, ${van.state} | Coffee Van Classifieds`;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `${van.title} - ${van.condition} condition coffee van for sale in ${van.location}, ${van.state}. $${van.price?.toLocaleString()} AUD. ${van.description?.substring(0, 120)}...`);
      }

      return () => {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        scripts.forEach(s => s.remove());
      };
    }
  }, [van?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-gray-200 rounded-2xl" />
            <div className="h-8 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !van) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Van not found</h1>
          <Link to={createPageUrl('BrowseVans')} className="text-[#F7B500] hover:underline">
            Browse all vans
          </Link>
        </div>
      </div>
    );
  }

  const images = van.images?.length > 0 ? van.images : 
    [van.main_image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const specs = [
    { label: 'Vehicle Type', value: van.Vehicle_type, icon: Coffee },
    { label: 'Make & Model', value: van.Vehicle_Make && van.Vehicle_Model ? `${van.Vehicle_Make} ${van.Vehicle_Model}` : null, icon: Coffee },
    { label: 'Odometer', value: van.Kms ? `${van.Kms.toLocaleString()} km` : null, icon: Coffee },
    { label: 'Coffee Machine', value: van.coffee_machine, icon: Coffee },
    { label: 'Grinder', value: van.grinder, icon: Coffee },
    { label: 'Power Source', value: van.power_source, icon: Zap },
    { label: 'Water Capacity', value: van.water_capacity ? `${van.water_capacity}L` : null, icon: Droplets },
  ].filter(s => s.value);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to={createPageUrl('BrowseVans')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1A1A1A] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to listings
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full aspect-video relative overflow-hidden cursor-zoom-in">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImageIndex}
                          src={images[currentImageIndex]}
                          alt={`${van.title} - Image ${currentImageIndex + 1} of ${images.length} - ${van.Vehicle_type} coffee van for sale ${van.location}`}
                          className="w-full h-full object-cover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      </AnimatePresence>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <img
                      src={images[currentImageIndex]}
                      alt={`${van.title} - Detailed view of ${van.Vehicle_type} coffee van equipment and setup`}
                      className="w-full h-auto rounded-lg"
                    />
                  </DialogContent>
                </Dialog>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        idx === currentImageIndex ? 'border-[#FDD202]' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1} - ${van.title}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">Description</h2>
              <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                {van.description}
              </p>
            </div>

            {/* Features */}
            {van.features?.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">Features & Equipment</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {van.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-600">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}
            {specs.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">Specifications</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#F7B500]/10 rounded-xl flex items-center justify-center">
                        <spec.icon className="w-6 h-6 text-[#F7B500]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{spec.label}</div>
                        <div className="font-semibold text-[#1A1A1A] capitalize">{spec.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Contact & Price */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              {/* Title & Location */}
              <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">{van.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6">
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
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {van.views || 0} views
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {van.built_by_tmcg && (
                  <TMCGVerifiedBadge size="md" />
                )}
                {van.featured && (
                  <Badge className="bg-[#FDD202] text-black">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {van.Vehicle_type && (
                  <Badge variant="outline" className="border-[#969696]">{van.Vehicle_type}</Badge>
                )}
                {van.Vehicle_subtype && (
                  <Badge variant="outline" className="border-[#969696]">{van.Vehicle_subtype}</Badge>
                )}
                {van.condition && (
                  <Badge variant="outline" className={`capitalize ${
                    van.condition === 'excellent' ? 'border-green-500 text-green-700' :
                    van.condition === 'good' ? 'border-blue-500 text-blue-700' :
                    'border-yellow-500 text-yellow-700'
                  }`}>
                    {van.condition} condition
                  </Badge>
                )}
              </div>

              {/* TMCG Seal */}
              {van.built_by_tmcg && (
                <div className="bg-[#F5F5F5] border border-[#969696] rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-4">
                    <TMCGVerifiedSeal />
                    <div>
                      <div className="font-bold text-black mb-1">TMCG Verified</div>
                      <div className="text-sm text-[#333333] leading-relaxed">
                        This van was built by The Mobile Coffee Group with our signature 
                        quality and craftsmanship.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="border-t border-b border-[#969696] py-6 mb-6">
                <div className="text-sm text-[#333333] mb-1">Asking Price</div>
                <div className="text-4xl font-bold text-black">
                  ${van.price?.toLocaleString()}
                </div>
              </div>

              {/* Contact Info */}
              {showContactInfo ? (
                <div className="space-y-4 mb-6">
                  {van.seller_name && (
                    <div>
                      <div className="text-sm text-gray-500">Seller</div>
                      <div className="font-semibold">{van.seller_name}</div>
                    </div>
                  )}
                  {van.seller_phone && (
                    <a
                      href={`tel:${van.seller_phone}`}
                      className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-xl hover:bg-[#DBDBDB] transition-colors border border-[#969696]"
                    >
                      <div className="w-10 h-10 bg-[#FDD202] rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-semibold">{van.seller_phone}</div>
                      </div>
                    </a>
                  )}
                  {van.seller_email && (
                    <a
                      href={`mailto:${van.seller_email}`}
                      className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-xl hover:bg-[#DBDBDB] transition-colors border border-[#969696]"
                    >
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-semibold">{van.seller_email}</div>
                      </div>
                    </a>
                  )}
                </div>
              ) : (
                <Button
                  onClick={() => setShowContactInfo(true)}
                  className="w-full bg-[#FDD202] text-black hover:bg-[#f5c400] h-14 text-lg font-semibold mb-4"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Show Contact Info
                </Button>
              )}

              {/* Share Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: van.title,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Listing
              </Button>
            </div>

            {/* Safety Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="font-semibold text-amber-800 mb-3">Safety Tips</h3>
              <ul className="text-sm text-amber-700 space-y-2">
                <li>• Always inspect the van in person before purchase</li>
                <li>• Verify all equipment is in working condition</li>
                <li>• Request service records and documentation</li>
                <li>• Use secure payment methods</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}