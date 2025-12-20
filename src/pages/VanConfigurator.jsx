import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, ArrowRight, Check, Download, Share2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import VanSelector from '../components/configurator/VanSelector';
import LayoutConfigurator from '../components/configurator/LayoutConfigurator';
import MaterialsSelector from '../components/configurator/MaterialsSelector';
import BrandingSelector from '../components/configurator/BrandingSelector';
import ConfigurationSummary from '../components/configurator/ConfigurationSummary';

const STEPS = [
  { id: 1, name: 'Select Van', component: VanSelector },
  { id: 2, name: 'Layout', component: LayoutConfigurator },
  { id: 3, name: 'Materials', component: MaterialsSelector },
  { id: 4, name: 'Branding', component: BrandingSelector },
  { id: 5, name: 'Summary', component: ConfigurationSummary }
];

export default function VanConfigurator() {
  const [currentStep, setCurrentStep] = useState(1);
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
    }
  });

  const updateConfiguration = (section, data) => {
    setConfiguration(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
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
                  }
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
                onClick={() => {
                  // Export configuration logic
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
                to={createPageUrl('TMCGContact')}
                className="inline-flex items-center justify-center gap-2 bg-[#FDD202] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#f5c400] transition-all"
              >
                Request Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}