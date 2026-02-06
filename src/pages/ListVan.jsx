import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
  Upload, X, Plus, Check, Loader2, Coffee, MapPin, 
  DollarSign, FileText, Camera, ArrowRight, ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  STATES, 
  CONDITIONS, 
  POWER_SOURCES, 
  VEHICLE_TYPES,
  getMakesForVehicleType,
  getModelsForMake
} from '../components/vans/vehicleData';

const steps = [
  { id: 1, title: 'Basic Info', icon: FileText },
  { id: 2, title: 'Details', icon: Coffee },
  { id: 3, title: 'Photos', icon: Camera },
  { id: 4, title: 'Contact', icon: MapPin },
];

export default function ListVan() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    state: '',
    Vehicle_type: '',
    trailer_type: '',
    van_type: '',
    truck_body_type: '',
    Vehicle_Make: '',
    Vehicle_Model: '',
    year_built: '',
    year_fitout: '',
    Kms: '',
    condition: '',
    description: '',
    features: [],
    power_source: '',
    water_system_type: '',
    seller_name: '',
    seller_phone: '',
    seller_email: '',
    main_image: '',
    images: [],
    status: 'pending',
  });
  const [newFeature, setNewFeature] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.CoffeeVan.create(data),
    onSuccess: () => {
      window.location.href = createPageUrl('BrowseVans');
    },
  });

  const handleChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Reset dependent fields when Vehicle_type changes
      if (field === 'Vehicle_type') {
        newData.trailer_type = '';
        newData.van_type = '';
        newData.truck_body_type = '';
        newData.Vehicle_Make = '';
        newData.Vehicle_Model = '';
      }
      
      // Reset model when make changes
      if (field === 'Vehicle_Make') {
        newData.Vehicle_Model = '';
      }
      
      return newData;
    });
  };

  // Get available makes based on vehicle type
  const availableMakes = getMakesForVehicleType(formData.Vehicle_type);
  
  // Get available models based on make and vehicle type
  const availableModels = getModelsForMake(formData.Vehicle_Make, formData.Vehicle_type);
  
  // Get subtypes for selected vehicle type
  // Subtype selections are handled per vehicle type (trailer_type, van_type, truck_body_type)

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    
    for (const file of files) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, file_url],
        main_image: prev.main_image || file_url,
      }));
    }
    
    setIsUploading(false);
  };

  const removeImage = (index) => {
    setFormData(prev => {
      const newImages = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: newImages,
        main_image: newImages[0] || '',
      };
    });
  };

  const setMainImage = (url) => {
    setFormData(prev => ({ ...prev, main_image: url }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    const data = {
      ...formData,
      price: Number(formData.price),
      year_built: formData.year_built ? Number(formData.year_built) : null,
      year_fitout: formData.year_fitout ? Number(formData.year_fitout) : null,
      Kms: formData.Kms ? Number(formData.Kms) : null,
    };
    createMutation.mutate(data);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.price && formData.location && formData.state;
      case 2:
        return formData.description;
      case 3:
        return formData.images.length > 0;
      case 4:
        return formData.seller_name && formData.seller_email;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            List Your <span className="text-[#FDD202]">Coffee Van</span>
          </h1>
          <p className="text-gray-400">
            Reach thousands of potential buyers across Australia
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b sticky top-[80px] z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                  className={`flex items-center gap-3 ${
                    currentStep > step.id ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    currentStep >= step.id
                      ? 'bg-[#FDD202] text-black'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`hidden sm:block font-medium ${
                    currentStep >= step.id ? 'text-[#1A1A1A]' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-[#FDD202]' : 'bg-[#DBDBDB]'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-black mb-6">Basic Information</h2>
                
                <div>
                  <Label htmlFor="title">Listing Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., 2020 Custom Coffee Trailer - Fully Equipped"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="price">Asking Price (AUD) *</Label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="45000"
                        value={formData.price}
                        onChange={(e) => handleChange('price', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="year_built">Year Built</Label>
                    <Input
                      id="year_built"
                      type="number"
                      placeholder="2020"
                      value={formData.year_built}
                      onChange={(e) => handleChange('year_built', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="location">City/Suburb *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Sydney"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>State *</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => handleChange('state', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATES.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Vehicle Type *</Label>
                  <Select
                    value={formData.Vehicle_type}
                    onValueChange={(value) => handleChange('Vehicle_type', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(VEHICLE_TYPES).map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.Vehicle_type === 'Trailer' && (
                  <div>
                    <Label>Trailer Type</Label>
                    <Select
                      value={formData.trailer_type}
                      onValueChange={(value) => handleChange('trailer_type', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select trailer type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single-Axle Trailer">Single-Axle Trailer</SelectItem>
                        <SelectItem value="Dual-Axle Trailer">Dual-Axle Trailer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {formData.Vehicle_type === 'Van' && (
                  <div>
                    <Label>Van Type</Label>
                    <Select
                      value={formData.van_type}
                      onValueChange={(value) => handleChange('van_type', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select van type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Compact Van">Compact Van</SelectItem>
                        <SelectItem value="Large Van">Large Van</SelectItem>
                        <SelectItem value="Extra Large - LWB/HR Van">Extra Large - LWB/HR Van</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {formData.Vehicle_type === 'Truck' && (
                  <div>
                    <Label>Truck Body Type</Label>
                    <Select
                      value={formData.truck_body_type}
                      onValueChange={(value) => handleChange('truck_body_type', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select truck body" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mini Truck">Mini Truck</SelectItem>
                        <SelectItem value="Vintage Truck">Vintage Truck</SelectItem>
                        <SelectItem value="Extra Large Truck">Extra Large Truck</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label>Vehicle Make</Label>
                    <Select
                      value={formData.Vehicle_Make}
                      onValueChange={(value) => handleChange('Vehicle_Make', value)}
                      disabled={!formData.Vehicle_type}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder={formData.Vehicle_type ? "Select make" : "Select type first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableMakes.map((make) => (
                          <SelectItem key={make} value={make}>{make}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Vehicle Model</Label>
                    <Select
                      value={formData.Vehicle_Model}
                      onValueChange={(value) => handleChange('Vehicle_Model', value)}
                      disabled={!formData.Vehicle_Make}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder={formData.Vehicle_Make ? "Select model" : "Select make first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableModels.map((model) => (
                          <SelectItem key={model} value={model}>{model}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="Kms">Odometer (Kms)</Label>
                    <Input
                      id="Kms"
                      type="number"
                      placeholder="e.g., 120000"
                      value={formData.Kms}
                      onChange={(e) => handleChange('Kms', e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Condition</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => handleChange('condition', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {CONDITIONS.map((cond) => (
                          <SelectItem key={cond} value={cond} className="capitalize">{cond}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-black mb-6">Van Details</h2>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your coffee van, its history, what's included, why you're selling..."
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="mt-2 min-h-[200px]"
                  />
                </div>

                {/* Equipment specific fields can be added later if included in schema */}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label>Power Source</Label>
                    <Select
                      value={formData.power_source}
                      onValueChange={(value) => handleChange('power_source', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select power source" />
                      </SelectTrigger>
                      <SelectContent>
                        {POWER_SOURCES.map((source) => (
                          <SelectItem key={source} value={source}>{source}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Water System</Label>
                    <Select
                      value={formData.water_system_type}
                      onValueChange={(value) => handleChange('water_system_type', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select water system" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hot and Cold Water">Hot and Cold Water</SelectItem>
                        <SelectItem value="Cold Water">Cold Water</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <Label>Features & Equipment</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Add a feature..."
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <Button type="button" onClick={addFeature} variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {formData.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {formData.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm"
                        >
                          {feature}
                          <button
                            type="button"
                            onClick={() => removeFeature(idx)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Photos */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-black mb-6">Photos</h2>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-[#969696] rounded-2xl p-8 text-center hover:border-[#FDD202] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={isUploading}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {isUploading ? (
                      <Loader2 className="w-12 h-12 text-[#FDD202] mx-auto mb-4 animate-spin" />
                    ) : (
                      <Upload className="w-12 h-12 text-[#969696] mx-auto mb-4" />
                    )}
                    <p className="text-gray-600 mb-2">
                      {isUploading ? 'Uploading...' : 'Click to upload images'}
                    </p>
                    <p className="text-sm text-gray-400">
                      PNG, JPG up to 10MB each
                    </p>
                  </label>
                </div>

                {/* Image Preview Grid */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {formData.images.map((url, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden">
                        <img
                          src={url}
                          alt={`Upload ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setMainImage(url)}
                            className={`p-2 rounded-full ${
                              formData.main_image === url
                                ? 'bg-[#FDD202] text-black'
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                            title="Set as main image"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                            title="Remove image"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        {formData.main_image === url && (
                          <div className="absolute top-2 left-2 bg-[#FDD202] text-black px-2 py-1 rounded text-xs font-semibold">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 4: Contact */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-black mb-6">Contact Information</h2>

                <div>
                  <Label htmlFor="seller_name">Your Name *</Label>
                  <Input
                    id="seller_name"
                    placeholder="John Smith"
                    value={formData.seller_name}
                    onChange={(e) => handleChange('seller_name', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="seller_email">Email Address *</Label>
                  <Input
                    id="seller_email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.seller_email}
                    onChange={(e) => handleChange('seller_email', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="seller_phone">Phone Number</Label>
                  <Input
                    id="seller_phone"
                    type="tel"
                    placeholder="0412 345 678"
                    value={formData.seller_phone}
                    onChange={(e) => handleChange('seller_phone', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm text-amber-800">
                    Your listing will be reviewed by our team before going live. 
                    This typically takes 24-48 hours.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!canProceed()}
                className="bg-[#FDD202] text-black hover:bg-[#f5c400]"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || createMutation.isPending}
                className="bg-[#FDD202] text-black hover:bg-[#f5c400]"
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Listing
                    <Check className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}