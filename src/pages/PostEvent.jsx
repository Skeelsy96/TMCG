import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const STATES = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'];
const EVENT_TYPES = ['Corporate', 'Private Function', 'Market/Festival', 'Sports Event', 'Wedding', 'Other'];
const SERVICES = ['Espresso Coffee', 'Cold Brew', 'Iced Coffee', 'Hot Chocolate', 'Tea', 'Pastries', 'Snacks'];

export default function PostEvent() {
  const [submitted, setSubmitted] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: '',
    event_date: '',
    event_time: '',
    duration_hours: '',
    location: '',
    state: '',
    expected_attendees: '',
    budget: '',
    specific_requirements: '',
    services_needed: [],
    organizer_name: '',
    organizer_email: '',
    organizer_phone: ''
  });

  const createEventMutation = useMutation({
    mutationFn: (data) => base44.entities.EventPosting.create(data),
    onSuccess: (event) => {
      setEventId(event.id);
      setSubmitted(true);
      toast.success('Event posted successfully!');
    },
    onError: () => {
      toast.error('Failed to post event. Please try again.');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createEventMutation.mutate({
      ...formData,
      duration_hours: parseFloat(formData.duration_hours) || 0,
      expected_attendees: parseInt(formData.expected_attendees) || 0,
      budget: parseFloat(formData.budget) || 0
    });
  };

  const toggleService = (service) => {
    setFormData(prev => ({
      ...prev,
      services_needed: prev.services_needed.includes(service)
        ? prev.services_needed.filter(s => s !== service)
        : [...prev.services_needed, service]
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-12 text-center border border-[#DBDBDB]">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-black mb-4">Event Posted Successfully!</h2>
            <p className="text-[#333333] mb-8">
              Your event is now live. Coffee van operators in your area will be able to apply to service your event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={createPageUrl('EventDetail') + `?id=${eventId}`}
                className="inline-flex items-center justify-center gap-2 bg-[#FDD202] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
              >
                View Event & Applications
              </Link>
              <Link
                to={createPageUrl('BrowseEvents')}
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold border border-[#DBDBDB] hover:bg-[#F5F5F5] transition-all"
              >
                Browse All Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-black py-12 border-b border-[#969696]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to={createPageUrl('Events')}
            className="inline-flex items-center gap-2 text-white hover:text-[#FDD202] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">
            Post Your <span className="text-[#FDD202]">Event</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Connect with professional coffee van operators for your event
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
          <div className="space-y-8">
            {/* Basic Info */}
            <div>
              <h3 className="text-xl font-bold text-black mb-6">Event Details</h3>
              <div className="space-y-6">
                <div>
                  <Label>Event Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., Annual Corporate Open Day"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Event Description *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your event, atmosphere, and what you're looking for..."
                    required
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Event Type *</Label>
                    <Select value={formData.event_type} onValueChange={(value) => setFormData({...formData, event_type: value})}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {EVENT_TYPES.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Expected Attendees *</Label>
                    <Input
                      type="number"
                      value={formData.expected_attendees}
                      onChange={(e) => setFormData({...formData, expected_attendees: e.target.value})}
                      placeholder="e.g., 150"
                      required
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <h3 className="text-xl font-bold text-black mb-6">Date & Time</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label>Event Date *</Label>
                  <Input
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={formData.event_time}
                    onChange={(e) => setFormData({...formData, event_time: e.target.value})}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Duration (hours)</Label>
                  <Input
                    type="number"
                    step="0.5"
                    value={formData.duration_hours}
                    onChange={(e) => setFormData({...formData, duration_hours: e.target.value})}
                    placeholder="e.g., 4"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-xl font-bold text-black mb-6">Location</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Venue/Location *</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Venue name and address"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>State *</Label>
                  <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Services & Budget */}
            <div>
              <h3 className="text-xl font-bold text-black mb-6">Services Required</h3>
              <div className="mb-6">
                <Label className="mb-3 block">What services do you need?</Label>
                <div className="flex flex-wrap gap-3">
                  {SERVICES.map(service => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`px-4 py-2 rounded-full border-2 transition-all ${
                        formData.services_needed.includes(service)
                          ? 'border-[#FDD202] bg-[#FDD202]/10 text-black'
                          : 'border-[#DBDBDB] text-[#333333] hover:border-[#FDD202]'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Budget (AUD)</Label>
                <Input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  placeholder="Your budget for coffee service"
                  className="mt-2"
                />
              </div>

              <div className="mt-6">
                <Label>Specific Requirements</Label>
                <Textarea
                  value={formData.specific_requirements}
                  onChange={(e) => setFormData({...formData, specific_requirements: e.target.value})}
                  placeholder="Any special requests, dietary requirements, setup needs, etc."
                  className="mt-2 min-h-[100px]"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-black mb-6">Your Contact Information</h3>
              <div className="space-y-6">
                <div>
                  <Label>Your Name *</Label>
                  <Input
                    value={formData.organizer_name}
                    onChange={(e) => setFormData({...formData, organizer_name: e.target.value})}
                    placeholder="John Smith"
                    required
                    className="mt-2"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={formData.organizer_email}
                      onChange={(e) => setFormData({...formData, organizer_email: e.target.value})}
                      placeholder="john@example.com"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Phone</Label>
                    <Input
                      type="tel"
                      value={formData.organizer_phone}
                      onChange={(e) => setFormData({...formData, organizer_phone: e.target.value})}
                      placeholder="0412 345 678"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button 
            type="submit"
            disabled={createEventMutation.isPending}
            className="w-full mt-8 bg-[#FDD202] text-black hover:bg-[#f5c400] h-14 text-lg"
          >
            {createEventMutation.isPending ? 'Posting Event...' : 'Post Event'}
          </Button>
        </form>
      </div>
    </div>
  );
}