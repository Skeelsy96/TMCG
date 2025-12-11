import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LeadEnquiryForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1
    mainReason: '',
    
    // Step 2 - Follow-ups
    incomeGoal: '',
    travelPreference: '',
    bossExcitement: '',
    freeTimeActivity: '',
    existingVansCount: '',
    existingBusinessTime: '',
    
    // Step 3
    journeyProgress: '',
    vanStyle: '',
    specificQuestions: '',
    timeframe: '',
    
    // Step 4
    budget: '',
    funding: '',
    anythingElse: '',
    
    // Step 5
    extraResources: [],
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    stateSuburb: '',
    bestDateTime: ''
  });

  const totalSteps = 5;

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCheckbox = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.mainReason !== '';
      case 2:
        if (formData.mainReason === 'earn_more') return formData.incomeGoal !== '';
        if (formData.mainReason === 'freedom_travel') return formData.travelPreference !== '';
        if (formData.mainReason === 'escape_9to5') return formData.bossExcitement !== '';
        if (formData.mainReason === 'more_free_time') return formData.freeTimeActivity !== '';
        if (formData.mainReason === 'expand_existing_fleet') 
          return formData.existingVansCount !== '' && formData.existingBusinessTime !== '';
        return true;
      case 3:
        return formData.journeyProgress !== '' && formData.vanStyle !== '' && formData.timeframe !== '';
      case 4:
        return formData.budget !== '' && formData.funding !== '';
      case 5:
        return formData.firstName && formData.lastName && formData.mobile && formData.email;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Prepare submission data
    const submission = {
      ...formData,
      submittedAt: new Date().toISOString(),
      submittedFrom: window.location.pathname,
      utmParams: {
        source: new URLSearchParams(window.location.search).get('utm_source'),
        medium: new URLSearchParams(window.location.search).get('utm_medium'),
        campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      }
    };

    try {
      // TODO: Implement actual submission to Google Sheets / Zapier
      console.log('Form submission:', submission);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your enquiry. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-12 text-center"
      >
        <div className="w-20 h-20 bg-[#FDD202]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-[#FDD202]" />
        </div>
        <h3 className="text-3xl font-bold text-black mb-4">
          Thank You!
        </h3>
        <p className="text-[#333333] text-lg mb-8">
          One of our dedicated Business Development Managers will reach out to you shortly to discuss your mobile coffee journey.
        </p>
        <a
          href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2dh9yagVZ217DA70maiVNanT4ngbs0id7gz80ZZN8MJCWG_gonsBorZWCH_fj9hFn4FVWIay36?gv=true"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
        >
          Book a 15 Min Phone Consultation
        </a>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
      {/* Progress Bar */}
      <div className="bg-[#F5F5F5] px-8 py-6 border-b border-[#DBDBDB]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#333333]">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm font-medium text-[#333333]">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-[#DBDBDB] rounded-full h-2">
          <div 
            className="bg-[#FDD202] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-black mb-6">
                What excites you most about starting your mobile coffee business?
              </h3>
              <div className="space-y-3">
                {[
                  { value: 'earn_more', label: 'I want the opportunity to earn more money' },
                  { value: 'freedom_travel', label: 'I want to have the freedom to travel' },
                  { value: 'escape_9to5', label: 'I want escape the 9-5' },
                  { value: 'more_free_time', label: 'I want to be able to have more free time' },
                  { value: 'expand_existing_fleet', label: 'I want to expand my existing Coffee Van fleet' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.mainReason === option.value
                        ? 'border-[#FDD202] bg-[#FDD202]/5'
                        : 'border-[#DBDBDB] hover:border-[#FDD202]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="mainReason"
                      value={option.value}
                      checked={formData.mainReason === option.value}
                      onChange={(e) => updateField('mainReason', e.target.value)}
                      className="w-5 h-5 text-[#FDD202] focus:ring-[#FDD202]"
                    />
                    <span className="text-black font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 - Dynamic based on Step 1 */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {formData.mainReason === 'earn_more' && (
                <>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    How much income do you want to generate per annum?
                  </h3>
                  <div className="space-y-3">
                    {['$50,000 - $100,000', '$100,000 - $150,000', '$150,000 - $200,000', 'More than $200,000'].map((option) => (
                      <label
                        key={option}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.incomeGoal === option
                            ? 'border-[#FDD202] bg-[#FDD202]/5'
                            : 'border-[#DBDBDB] hover:border-[#FDD202]/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="incomeGoal"
                          value={option}
                          checked={formData.incomeGoal === option}
                          onChange={(e) => updateField('incomeGoal', e.target.value)}
                          className="w-5 h-5 text-[#FDD202]"
                        />
                        <span className="text-black font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {formData.mainReason === 'freedom_travel' && (
                <>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    What sort of travelling do you want to do?
                  </h3>
                  <div className="space-y-3">
                    {[
                      'I want to explore my local area and discover new places close to home',
                      'I want to travel semi-locally to experience different events, markets, and festivals',
                      'I want to \'road-trip\' around Australia and explore different parts of the country',
                      'I want to travel internationally on overseas adventures'
                    ].map((option) => (
                      <label
                        key={option}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.travelPreference === option
                            ? 'border-[#FDD202] bg-[#FDD202]/5'
                            : 'border-[#DBDBDB] hover:border-[#FDD202]/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="travelPreference"
                          value={option}
                          checked={formData.travelPreference === option}
                          onChange={(e) => updateField('travelPreference', e.target.value)}
                          className="w-5 h-5 text-[#FDD202]"
                        />
                        <span className="text-black font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {formData.mainReason === 'escape_9to5' && (
                <>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    What excites you most about becoming your own boss?
                  </h3>
                  <div className="space-y-3">
                    {[
                      'The flexibility in choosing my days/hours',
                      'Doing something that makes me happy and that I love doing',
                      'The opportunity to have an uncapped earning potential',
                      'The freedom of having a better Work / Life balance'
                    ].map((option) => (
                      <label
                        key={option}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.bossExcitement === option
                            ? 'border-[#FDD202] bg-[#FDD202]/5'
                            : 'border-[#DBDBDB] hover:border-[#FDD202]/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="bossExcitement"
                          value={option}
                          checked={formData.bossExcitement === option}
                          onChange={(e) => updateField('bossExcitement', e.target.value)}
                          className="w-5 h-5 text-[#FDD202]"
                        />
                        <span className="text-black font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {formData.mainReason === 'more_free_time' && (
                <>
                  <h3 className="text-2xl font-bold text-black mb-6">
                    How will you spend your extra free time?
                  </h3>
                  <div className="space-y-3">
                    {[
                      'I want to spend it with my Friends and Family',
                      'I want to spend it on my hobbies and passions',
                      'I want to discover new interests and experiences',
                      'I don\'t know what I\'ll do with that much free time?'
                    ].map((option) => (
                      <label
                        key={option}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.freeTimeActivity === option
                            ? 'border-[#FDD202] bg-[#FDD202]/5'
                            : 'border-[#DBDBDB] hover:border-[#FDD202]/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="freeTimeActivity"
                          value={option}
                          checked={formData.freeTimeActivity === option}
                          onChange={(e) => updateField('freeTimeActivity', e.target.value)}
                          className="w-5 h-5 text-[#FDD202]"
                        />
                        <span className="text-black font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {formData.mainReason === 'expand_existing_fleet' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-6">
                      How many vans do you currently have?
                    </h3>
                    <div className="space-y-3">
                      {['1', '2', '3', '4 or More'].map((option) => (
                        <label
                          key={option}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.existingVansCount === option
                              ? 'border-[#FDD202] bg-[#FDD202]/5'
                              : 'border-[#DBDBDB] hover:border-[#FDD202]/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="existingVansCount"
                            value={option}
                            checked={formData.existingVansCount === option}
                            onChange={(e) => updateField('existingVansCount', e.target.value)}
                            className="w-5 h-5 text-[#FDD202]"
                          />
                          <span className="text-black font-medium">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-black mb-6">
                      How long have you been operating your existing business?
                    </h3>
                    <div className="space-y-3">
                      {['Less than 1 Year', '1-2 Years', '2-3 Years', 'More than 3 Years'].map((option) => (
                        <label
                          key={option}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.existingBusinessTime === option
                              ? 'border-[#FDD202] bg-[#FDD202]/5'
                              : 'border-[#DBDBDB] hover:border-[#FDD202]/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="existingBusinessTime"
                            value={option}
                            checked={formData.existingBusinessTime === option}
                            onChange={(e) => updateField('existingBusinessTime', e.target.value)}
                            className="w-5 h-5 text-[#FDD202]"
                          />
                          <span className="text-black font-medium">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3 - Journey Stage & Van Style */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-black mb-6">
                  Where are you on your journey?
                </h3>
                <div className="space-y-3">
                  {[
                    'I\'ve done my research, I am ready to order a van!',
                    'I have a rough plan / vision and I\'m ready to explore my options',
                    'I have just started looking and would like more general information',
                    'I have some specific questions I would like answered'
                  ].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.journeyProgress === option
                          ? 'border-[#FDD202] bg-[#FDD202]/5'
                          : 'border-[#DBDBDB] hover:border-[#FDD202]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="journeyProgress"
                        value={option}
                        checked={formData.journeyProgress === option}
                        onChange={(e) => updateField('journeyProgress', e.target.value)}
                        className="w-5 h-5 text-[#FDD202]"
                      />
                      <span className="text-black font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.journeyProgress === 'I have some specific questions I would like answered' && (
                <div>
                  <Label htmlFor="specificQuestions" className="text-black">Your Questions</Label>
                  <Textarea
                    id="specificQuestions"
                    value={formData.specificQuestions}
                    onChange={(e) => updateField('specificQuestions', e.target.value)}
                    placeholder="Please let us know what specific questions you have..."
                    className="mt-2 min-h-[120px]"
                  />
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-black mb-6">
                  Which style of mobile coffee van are you most interested in?
                </h3>
                <div className="space-y-3">
                  {[
                    'Serve From Rear / Large Van',
                    'Walk-In Van',
                    'Coffee Ute',
                    'Coffee SUV',
                    'Something Else',
                    'I have the vehicle already. I want a quote on a Custom Fit-Out'
                  ].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.vanStyle === option
                          ? 'border-[#FDD202] bg-[#FDD202]/5'
                          : 'border-[#DBDBDB] hover:border-[#FDD202]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="vanStyle"
                        value={option}
                        checked={formData.vanStyle === option}
                        onChange={(e) => updateField('vanStyle', e.target.value)}
                        className="w-5 h-5 text-[#FDD202]"
                      />
                      <span className="text-black font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-black mb-6">
                  When would you want to be serving your first coffee?
                </h3>
                <div className="space-y-3">
                  {['ASAP', 'Within the next 3 months', '3 - 6 months', '6 - 12 months'].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.timeframe === option
                          ? 'border-[#FDD202] bg-[#FDD202]/5'
                          : 'border-[#DBDBDB] hover:border-[#FDD202]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="timeframe"
                        value={option}
                        checked={formData.timeframe === option}
                        onChange={(e) => updateField('timeframe', e.target.value)}
                        className="w-5 h-5 text-[#FDD202]"
                      />
                      <span className="text-black font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4 - Budget & Funding */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-black mb-6">
                  What is your budget for this investment?
                </h3>
                <div className="space-y-3">
                  {['Up to $100k', '$100k - $150k', '$150k - $200k', 'Over $200k'].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.budget === option
                          ? 'border-[#FDD202] bg-[#FDD202]/5'
                          : 'border-[#DBDBDB] hover:border-[#FDD202]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={option}
                        checked={formData.budget === option}
                        onChange={(e) => updateField('budget', e.target.value)}
                        className="w-5 h-5 text-[#FDD202]"
                      />
                      <span className="text-black font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-black mb-6">
                  How would you be funding the investment?
                </h3>
                <div className="space-y-3">
                  {[
                    'I have the funds already available',
                    'I have my own finance arranged',
                    'I want to know more about finance options'
                  ].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.funding === option
                          ? 'border-[#FDD202] bg-[#FDD202]/5'
                          : 'border-[#DBDBDB] hover:border-[#FDD202]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="funding"
                        value={option}
                        checked={formData.funding === option}
                        onChange={(e) => updateField('funding', e.target.value)}
                        className="w-5 h-5 text-[#FDD202]"
                      />
                      <span className="text-black font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="anythingElse" className="text-black">Anything else we should know?</Label>
                <Textarea
                  id="anythingElse"
                  value={formData.anythingElse}
                  onChange={(e) => updateField('anythingElse', e.target.value)}
                  placeholder="Let us know if there's anything else you'd like to know..."
                  className="mt-2 min-h-[100px]"
                />
              </div>
            </motion.div>
          )}

          {/* Step 5 - Contact Details */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-black mb-6">
                  Would you like some more information on any of these?
                </h3>
                <div className="space-y-3">
                  {[
                    'Early Bird Coffee Supplies (Details about our boutique in-house roastery)',
                    'Barista Training and Support (Complimentary Coffee Training)',
                    'Business Starter Guide (Complimentary Business Start-up and Support Guide)',
                    'Pictures and Videos of Previous Vans we have built (Over 900 built Australia-Wide)'
                  ].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.extraResources.includes(option)
                          ? 'border-[#FDD202] bg-[#FDD202]/5'
                          : 'border-[#DBDBDB] hover:border-[#FDD202]/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.extraResources.includes(option)}
                        onChange={() => toggleCheckbox('extraResources', option)}
                        className="w-5 h-5 text-[#FDD202] rounded"
                      />
                      <span className="text-black font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#DBDBDB]">
                <h3 className="text-2xl font-bold text-black mb-6">
                  Your Contact Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-black">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      placeholder="John"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-black">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      placeholder="Smith"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobile" className="text-black">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => updateField('mobile', e.target.value)}
                      placeholder="0412 345 678"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-black">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="john@example.com"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="stateSuburb" className="text-black">State & Suburb</Label>
                    <Input
                      id="stateSuburb"
                      value={formData.stateSuburb}
                      onChange={(e) => updateField('stateSuburb', e.target.value)}
                      placeholder="e.g. NSW – Central Coast"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bestDateTime" className="text-black">Best Date/Time to Reach You</Label>
                    <Input
                      id="bestDateTime"
                      type="datetime-local"
                      value={formData.bestDateTime}
                      onChange={(e) => updateField('bestDateTime', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#FDD202]/10 border border-[#FDD202] rounded-xl p-6">
                <p className="text-sm text-black">
                  Thank you for taking the time to complete this. One of our dedicated Business Development Managers will endeavour to reach out as efficiently as possible.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-8 border-t border-[#DBDBDB]">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 1}
            className="border-[#DBDBDB]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
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
              disabled={!canProceed() || isSubmitting}
              className="bg-[#FDD202] text-black hover:bg-[#f5c400]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit My Details
                  <CheckCircle className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}