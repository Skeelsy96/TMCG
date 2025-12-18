import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeft, Upload, X, Coffee, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function OperatorApplication() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    business_name: '',
    operator_name: '',
    bio: '',
    van_description: '',
    years_in_business: '',
    services_offered: [],
    event_types: [],
    location: '',
    state: '',
    coverage_area: '',
    profile_image: '',
    gallery_images: [],
    contact_email: '',
    contact_phone: '',
    website: '',
    social_instagram: '',
    social_facebook: '',
    built_by_tmcg: false
  });

  const serviceOptions = [
    'Espresso Coffee', 'Cold Brew', 'Specialty Coffee', 'Tea & Chai', 
    'Hot Chocolate', 'Smoothies', 'Food Service', 'Full Catering'
  ];

  const eventTypeOptions = [
    'Corporate Events', 'Weddings', 'Private Functions', 'Markets & Festivals',
    'Sports Events', 'School Functions', 'Construction Sites', 'Regular Locations'
  ];

  const createApplicationMutation = useMutation({
    mutationFn: (data) => base44.entities.OperatorApplication.create(data),
    onSuccess: () => {
      setSubmitted(true);
      toast.success('Application submitted successfully!');
    },
    onError: () => {
      toast.error('Failed to submit application. Please try again.');
    }
  });

  const handleImageUpload = async (e, type) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(file => 
        base44.integrations.Core.UploadFile({ file })
      );
      const results = await Promise.all(uploadPromises);
      const urls = results.map(r => r.file_url);

      if (type === 'profile') {
        setFormData({ ...formData, profile_image: urls[0] });
      } else {
        setFormData({ ...formData, gallery_images: [...formData.gallery_images, ...urls] });
      }
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (index) => {
    setFormData({
      ...formData,
      gallery_images: formData.gallery_images.filter((_, i) => i !== index)
    });
  };

  const toggleService = (service) => {
    setFormData({
      ...formData,
      services_offered: formData.services_offered.includes(service)
        ? formData.services_offered.filter(s => s !== service)
        : [...formData.services_offered, service]
    });
  };

  const toggleEventType = (eventType) => {
    setFormData({
      ...formData,
      event_types: formData.event_types.includes(eventType)
        ? formData.event_types.filter(e => e !== eventType)
        : [...formData.event_types, eventType]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createApplicationMutation.mutate({
      ...formData,
      years_in_business: formData.years_in_business ? parseInt(formData.years_in_business) : 0,
      status: 'pending'
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-2xl w-full text-center"
        >
          <div className="w-20 h-20 bg-[#FDD202] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-4">Application Submitted!</h1>
          <p className="text-[#333333] mb-8 leading-relaxed">
            Thank you for applying to join The Mobile Coffee Group operator network. 
            We'll review your application and get back to you within 2-3 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl('BrowseOperators')} className="inline-flex items-center justify-center gap-2 bg-[#FDD202] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#f5c400] transition-all">
              Browse Operators
            </Link>
            <Link to={createPageUrl('Events')} className="inline-flex items-center justify-center gap-2 border border-[#DBDBDB] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#F5F5F5] transition-all">
              View Events
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to={createPageUrl('BrowseOperators')} className="inline-flex items-center gap-2 text-[#333333] hover:text-black mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>

        <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Join Our Operator Network</h1>
            <p className="text-[#333333]">
              Complete this application to be featured in our operator directory and connect with events across Australia
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-black border-b border-[#DBDBDB] pb-3">Business Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Business Name *</Label>
                  <Input
                    value={formData.business_name}
                    onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                    placeholder="e.g. Sunrise Coffee Co"
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Your Name *</Label>
                  <Input
                    value={formData.operator_name}
                    onChange={(e) => setFormData({...formData, operator_name: e.target.value})}
                    placeholder="e.g. Sarah Smith"
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label>About Your Business *</Label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Tell us about your coffee business, your story, and what makes you unique..."
                  required
                  className="mt-2 min-h-[120px]"
                />
              </div>

              <div>
                <Label>Years in Business</Label>
                <Input
                  type="number"
                  value={formData.years_in_business}
                  onChange={(e) => setFormData({...formData, years_in_business: e.target.value})}
                  placeholder="e.g. 3"
                  className="mt-2"
                />
              </div>
            </div>

            {/* Van Details */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-black border-b border-[#DBDBDB] pb-3">Van Details</h2>
              
              <div>
                <Label>Van Description</Label>
                <Textarea
                  value={formData.van_description}
                  onChange={(e) => setFormData({...formData, van_description: e.target.value})}
                  placeholder="Describe your coffee van setup, equipment, and capabilities..."
                  className="mt-2 min-h-[100px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={formData.built_by_tmcg}
                  onCheckedChange={(checked) => setFormData({...formData, built_by_tmcg: checked})}
                  id="tmcg"
                />
                <Label htmlFor="tmcg" className="cursor-pointer">
                  My van was built by The Mobile Coffee Group
                </Label>
              </div>
            </div>

            {/* Services & Events */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-black border-b border-[#DBDBDB] pb-3">Services & Events</h2>
              
              <div>
                <Label className="mb-3 block">Services Offered</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {serviceOptions.map((service) => (
                    <div key={service} className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.services_offered.includes(service)}
                        onCheckedChange={() => toggleService(service)}
                        id={service}
                      />
                      <Label htmlFor={service} className="cursor-pointer">{service}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Event Types You Service</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {eventTypeOptions.map((eventType) => (
                    <div key={eventType} className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.event_types.includes(eventType)}
                        onCheckedChange={() => toggleEventType(eventType)}
                        id={eventType}
                      />
                      <Label htmlFor={eventType} className="cursor-pointer">{eventType}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-black border-b border-[#DBDBDB] pb-3">Operating Location</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Primary Location *</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g. Sydney"
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>State *</Label>
                  <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})} required>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
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

              <div>
                <Label>Coverage Area</Label>
                <Input
                  value={formData.coverage_area}
                  onChange={(e) => setFormData({...formData, coverage_area: e.target.value})}
                  placeholder="e.g. Greater Sydney, up to 50km radius"
                  className="mt-2"
                />
              </div>
            </div>

            {/* Photos */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-black border-b border-[#DBDBDB] pb-3">Photos</h2>
              
              <div>
                <Label>Profile Photo</Label>
                <p className="text-sm text-[#333333] mt-1 mb-3">Main photo of your coffee van</p>
                {formData.profile_image ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-[#DBDBDB]">
                    <img src={formData.profile_image} alt="Profile" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, profile_image: ''})}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#DBDBDB] rounded-lg cursor-pointer hover:bg-[#F5F5F5] transition-colors">
                    <Upload className="w-8 h-8 text-[#969696] mb-2" />
                    <span className="text-sm text-[#333333]">Click to upload</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile')} />
                  </label>
                )}
              </div>

              <div>
                <Label>Gallery Photos</Label>
                <p className="text-sm text-[#333333] mt-1 mb-3">Additional photos of your van, setup, and events</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {formData.gallery_images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border-2 border-[#DBDBDB]">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#DBDBDB] rounded-lg cursor-pointer hover:bg-[#F5F5F5] transition-colors">
                  <Upload className="w-6 h-6 text-[#969696] mb-2" />
                  <span className="text-sm text-[#333333]">Add more photos</span>
                  <input type="file" className="hidden" accept="image/*" multiple onChange={(e) => handleImageUpload(e, 'gallery')} />
                </label>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-black border-b border-[#DBDBDB] pb-3">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                    placeholder="info@yourvan.com.au"
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input
                    type="tel"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
                    placeholder="0412 345 678"
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label>Website</Label>
                <Input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  placeholder="https://yourvan.com.au"
                  className="mt-2"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Instagram</Label>
                  <Input
                    value={formData.social_instagram}
                    onChange={(e) => setFormData({...formData, social_instagram: e.target.value})}
                    placeholder="yourvancoffee"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Facebook</Label>
                  <Input
                    value={formData.social_facebook}
                    onChange={(e) => setFormData({...formData, social_facebook: e.target.value})}
                    placeholder="https://facebook.com/yourvan"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-[#DBDBDB]">
              <Button type="submit" disabled={createApplicationMutation.isPending || uploading} className="flex-1 bg-[#FDD202] text-black hover:bg-[#f5c400] h-12">
                {createApplicationMutation.isPending ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}