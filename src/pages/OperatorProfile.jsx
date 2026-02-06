import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, MapPin, Mail, Phone, Globe, Instagram, Facebook, CheckCircle, Coffee, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import TMCGVerifiedBadge from '../components/common/TMCGVerifiedBadge';

export default function OperatorProfile() {
  const { operatorId } = useParams();
  const [selectedImage, setSelectedImage] = React.useState(0);
  const urlParams = new URLSearchParams(window.location.search);
  const operatorIdParam = operatorId || urlParams.get('operatorId');

  const { data: operator, isLoading, error } = useQuery({
    queryKey: ['operator', operatorIdParam],
    queryFn: async () => {
      const operators = await base44.entities.OperatorProfile.filter({ id: operatorIdParam });
      return operators[0];
    },
    enabled: !!operatorIdParam
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <Coffee className="w-16 h-16 text-[#FDD202] animate-pulse mx-auto mb-4" />
          <p className="text-[#333333]">Loading operator profile...</p>
        </div>
      </div>
    );
  }

  if (error || !operator) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#333333] mb-4">Operator not found</p>
          <Link to={createPageUrl('BrowseOperators')} className="text-[#FDD202] hover:underline">
            Browse All Operators
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [operator.profile_image, ...(operator.gallery_images || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to={createPageUrl('BrowseOperators')} className="inline-flex items-center gap-2 text-[#333333] hover:text-black mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to Operators
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            {allImages.length > 0 && (
              <div className="bg-white rounded-2xl overflow-hidden border border-[#DBDBDB]">
                <div className="aspect-video relative">
                  <img
                    src={allImages[selectedImage]}
                    alt={operator.business_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {allImages.length > 1 && (
                  <div className="p-4 flex gap-2 overflow-x-auto">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === idx ? 'border-[#FDD202]' : 'border-transparent'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* About */}
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-4">About {operator.business_name}</h2>
              <p className="text-[#333333] leading-relaxed whitespace-pre-line">{operator.bio}</p>
            </div>

            {/* Van Details */}
            {operator.van_description && (
              <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
                <h2 className="text-2xl font-bold text-black mb-4">Our Van</h2>
                <p className="text-[#333333] leading-relaxed">{operator.van_description}</p>
              </div>
            )}

            {/* Services & Events */}
            <div className="grid md:grid-cols-2 gap-6">
              {operator.services_offered?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-[#DBDBDB]">
                  <h3 className="font-bold text-black mb-4">Services Offered</h3>
                  <ul className="space-y-2">
                    {operator.services_offered.map((service, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[#333333]">
                        <CheckCircle className="w-4 h-4 text-[#FDD202]" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {operator.event_types?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-[#DBDBDB]">
                  <h3 className="font-bold text-black mb-4">Event Types</h3>
                  <ul className="space-y-2">
                    {operator.event_types.map((type, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[#333333]">
                        <Calendar className="w-4 h-4 text-[#FDD202]" />
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#DBDBDB] sticky top-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-black mb-2">{operator.business_name}</h1>
                  <p className="text-[#333333]">{operator.operator_name}</p>
                </div>
                {operator.built_by_tmcg && <TMCGVerifiedBadge />}
              </div>

              {operator.verified && (
                <div className="flex items-center gap-2 bg-[#FDD202]/10 border border-[#FDD202] rounded-lg px-3 py-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-[#FDD202]" />
                  <span className="text-sm font-semibold text-black">Verified Operator</span>
                </div>
              )}

              {!operator.available_for_booking && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
                  <span className="text-sm text-red-600">Currently not accepting bookings</span>
                </div>
              )}

              {/* Location */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FDD202] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-black">{operator.location}, {operator.state}</p>
                    {operator.coverage_area && (
                      <p className="text-sm text-[#333333]">{operator.coverage_area}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-3 pt-6 border-t border-[#DBDBDB]">
                <h3 className="font-bold text-black mb-4">Contact</h3>
                {operator.contact_email && (
                  <a href={`mailto:${operator.contact_email}`} className="flex items-center gap-3 text-[#333333] hover:text-[#FDD202]">
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">{operator.contact_email}</span>
                  </a>
                )}
                {operator.contact_phone && (
                  <a href={`tel:${operator.contact_phone}`} className="flex items-center gap-3 text-[#333333] hover:text-[#FDD202]">
                    <Phone className="w-5 h-5" />
                    <span className="text-sm">{operator.contact_phone}</span>
                  </a>
                )}
                {operator.website && (
                  <a href={operator.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#333333] hover:text-[#FDD202]">
                    <Globe className="w-5 h-5" />
                    <span className="text-sm">Website</span>
                  </a>
                )}
                {operator.social_instagram && (
                  <a href={`https://instagram.com/${operator.social_instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#333333] hover:text-[#FDD202]">
                    <Instagram className="w-5 h-5" />
                    <span className="text-sm">@{operator.social_instagram}</span>
                  </a>
                )}
                {operator.social_facebook && (
                  <a href={operator.social_facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#333333] hover:text-[#FDD202]">
                    <Facebook className="w-5 h-5" />
                    <span className="text-sm">Facebook</span>
                  </a>
                )}
              </div>

              {operator.available_for_booking && (
                <Button className="w-full mt-6 bg-[#FDD202] text-black hover:bg-[#f5c400]">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact for Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}