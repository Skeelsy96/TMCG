import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, ArrowRight, Check, Download, Share2, RotateCcw, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { base44 } from '@/api/base44Client';
import VanSelector from '../components/configurator/VanSelector';
import LayoutConfigurator from '../components/configurator/LayoutConfigurator';
import MaterialsSelector from '../components/configurator/MaterialsSelector';
import BrandingSelector from '../components/configurator/BrandingSelector';
import ConfigurationSummary from '../components/configurator/ConfigurationSummary';
import VanPreview3D from '../components/configurator/VanPreview3D';
import PriceTracker from '../components/configurator/PriceTracker';
import InclusionsList from '../components/configurator/InclusionsList';
import PackageDetailsTile from '../components/configurator/PackageDetailsTile';
import OptionalExtrasList from '../components/configurator/OptionalExtrasList';

const STEPS = [
  { id: 1, name: 'Select Van', component: VanSelector },
  { id: 2, name: 'Layout', component: LayoutConfigurator },
  { id: 3, name: 'Materials', component: MaterialsSelector },
  { id: 4, name: 'Branding', component: BrandingSelector },
  { id: 5, name: 'Summary', component: ConfigurationSummary }
];

export default function VanConfigurator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [configId, setConfigId] = useState(null);
  const [configuration, setConfiguration] = useState({
    vanModel: null,
    layout: {
      appliances: [],
      dimensions: { width: 0, length: 0 }
    },
    materials: {
      benchtop: 'stainless-steel',
      cabinetry: 'white',
      flooring: 'vinyl-grey'
    },
    branding: {
      primaryColor: '#FDD202',
      secondaryColor: '#000000',
      logoPosition: 'side',
      businessName: ''
    },
    optionalExtras: []
  });

  // Map old IDs to new ones
  const normalizeLoadedConfig = (conf) => {
    const map = {
      'compact-suv': 'Compact-Van',
      'large-van': 'Large-Van',
      'walk-in': 'Walk-In Van'
    };
    const cloned = { ...conf };
    if (cloned?.vanModel?.id && map[cloned.vanModel.id]) {
      cloned.vanModel = { ...cloned.vanModel, id: map[cloned.vanModel.id] };
    }
    return cloned;
  };

   // Load configuration from URL if shared
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedConfigId = urlParams.get('config');
    if (sharedConfigId) {
      loadConfiguration(sharedConfigId);
    }
  }, []);

  const loadConfiguration = async (id) => {
    try {
      const config = await base44.integrations.Core.InvokeLLM({
        prompt: `Retrieve configuration with ID: ${id}`,
        response_json_schema: {
          type: 'object',
          properties: {
            configuration: { type: 'object' }
          }
        }
      });
      if (config.configuration) {
        const normalized = normalizeLoadedConfig(config.configuration);
        setConfiguration(normalized);
        setConfigId(id);
        toast.success('Configuration loaded');
      }
    } catch (error) {
      toast.error('Failed to load configuration');
    }
  };

  const saveConfiguration = async () => {
    try {
      const user = await base44.auth.me();
      const id = `config-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Save to user profile
      await base44.auth.updateMe({
        van_configurations: {
          [id]: {
            ...configuration,
            created: new Date().toISOString()
          }
        }
      });

      setConfigId(id);
      toast.success('Configuration saved to your profile');
      return id;
    } catch (error) {
      toast.error('Please log in to save configuration');
      return null;
    }
  };

  const generateShareLink = async () => {
    try {
      const id = configId || await saveConfiguration();
      if (!id) return;

      const shareUrl = `${window.location.origin}${createPageUrl('VanConfigurator')}?config=${id}`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'My Van Configuration',
          text: 'Check out my custom coffee van design!',
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Share link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const updateConfiguration = (section, data) => {
    setConfiguration(prev => ({
      ...prev,
      [section]: (prev[section] && typeof prev[section] === 'object' && typeof data === 'object' && !Array.isArray(data))
        ? { ...prev[section], ...data }
        : data
    }));
  };

  const canProceed = () => {
    if (currentStep === 1 && !configuration.vanModel) return false;
    if (currentStep === 2 && configuration.layout.appliances.length === 0) return false;
    return true;
  };

  const CurrentStepComponent = STEPS[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-black border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link 
                to={createPageUrl('NewVans')}
                className="inline-flex items-center gap-2 text-white hover:text-[#FDD202] transition-colors mb-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Van Packages
              </Link>
              <h1 className="text-3xl font-bold text-white">
                Build Your <span className="text-[#FDD202]">Coffee Van</span>
              </h1>
            </div>
            <Button
              onClick={() => {
                setConfiguration({
                  vanModel: null,
                  layout: { appliances: [], dimensions: { width: 0, length: 0 } },
                  materials: {
                    benchtop: 'stainless-steel',
                    cabinetry: 'white',
                    flooring: 'vinyl-grey'
                  },
                  branding: {
                    primaryColor: '#FDD202',
                    secondaryColor: '#000000',
                    logoPosition: 'side',
                    businessName: ''
                  },
                  optionalExtras: []
                });
                setCurrentStep(1);
              }}
              variant="outline"
              className="bg-white text-black hover:bg-gray-100"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-[#DBDBDB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => {
                    if (step.id < currentStep || (step.id === currentStep)) {
                      setCurrentStep(step.id);
                    }
                  }}
                  disabled={step.id > currentStep}
                  className={`flex items-center gap-3 ${
                    step.id > currentStep ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step.id === currentStep
                      ? 'bg-[#FDD202] text-black'
                      : step.id < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-[#DBDBDB] text-[#969696]'
                  }`}>
                    {step.id < currentStep ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`font-semibold hidden md:block ${
                    step.id === currentStep ? 'text-black' : 'text-[#969696]'
                  }`}>
                    {step.name}
                  </span>
                </button>
                {index < STEPS.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                    step.id < currentStep ? 'bg-green-500' : 'bg-[#DBDBDB]'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent
                configuration={configuration}
                updateConfiguration={updateConfiguration}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Package Details - full width */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-black mb-4">Package Details</h3>
          {configuration.vanModel ? (
            <PackageDetailsTile vanModelId={configuration.vanModel.id} />
          ) : (
            <div className="rounded-xl border border-[#DBDBDB] bg-white p-4 text-sm text-[#969696]">Select a van to see package details.</div>
          )}
        </div>

        {/* 3D Preview + Optional Extras */}
        <div className="mb-12">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-black mb-4">3D Preview</h3>
              <VanPreview3D configuration={configuration} updateConfiguration={updateConfiguration} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-4">Optional Extras Available</h3>
              {configuration.vanModel ? (
                <OptionalExtrasList configuration={configuration} updateConfiguration={updateConfiguration} />
              ) : (
                <div className="rounded-xl border border-[#DBDBDB] bg-white p-4 text-sm text-[#969696]">Select a van to see optional extras.</div>
              )}
            </div>
          </div>
        </div>

        {/* Inclusions & Extras */}
        {configuration.vanModel && (
          <div className="mb-12">
            <InclusionsList vanModelId={configuration.vanModel.id} />
          </div>
        )}

        {/* Helper note */}
        <div className="text-xs text-[#969696] mb-4">Tip: You can update inclusions any time in the database (VanFitOutInclusionsList).</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#DBDBDB]">
          <Button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            variant="outline"
            size="lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          {currentStep < STEPS.length ? (
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceed()}
              size="lg"
              className="bg-[#FDD202] text-black hover:bg-[#f5c400]"
            >
              Next Step
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                onClick={saveConfiguration}
                variant="outline"
                size="lg"
              >
                <Save className="w-5 h-5 mr-2" />
                Save
              </Button>
              <Button
                onClick={generateShareLink}
                variant="outline"
                size="lg"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
              <Button
                onClick={() => {
                  const configData = JSON.stringify(configuration, null, 2);
                  const blob = new Blob([configData], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'my-van-configuration.json';
                  a.click();
                }}
                variant="outline"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Export
              </Button>
              <Link
                to={`${createPageUrl('TMCGContact')}?config=${configId || ''}`}
                className="inline-flex items-center justify-center gap-2 bg-[#FDD202] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#f5c400] transition-all"
              >
                Request Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Price Tracker */}
      {configuration.vanModel && <PriceTracker configuration={configuration} />}
    </div>
  );
}