import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Clock, Mail, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');
  const queryClient = useQueryClient();

  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    business_name: '',
    operator_email: '',
    operator_phone: '',
    proposed_price: '',
    message: '',
    experience_description: '',
    equipment_details: ''
  });

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      const events = await base44.entities.EventPosts.filter({ id: eventId });
      return events[0];
    },
    enabled: !!eventId
  });

  const { data: applications = [] } = useQuery({
    queryKey: ['event-applications', eventId],
    queryFn: () => base44.entities.EventApplications.filter({ event_id: eventId })
  });

  const { data: currentUser } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me()
  });

  const applyMutation = useMutation({
    mutationFn: (data) => base44.entities.EventApplications.create({
      ...data,
      event_id: eventId,
      proposed_price: parseFloat(data.proposed_price)
    }),
    onSuccess: async () => {
      await base44.entities.EventPosting.update(eventId, {
        applications_count: (event.applications_count || 0) + 1
      });
      queryClient.invalidateQueries(['event', eventId]);
      queryClient.invalidateQueries(['event-applications', eventId]);
      toast.success('Application submitted successfully!');
      setShowApplicationForm(false);
    },
    onError: () => {
      toast.error('Failed to submit application');
    }
  });

  const acceptApplicationMutation = useMutation({
    mutationFn: async ({ applicationId }) => {
      await base44.entities.EventApplications.update(applicationId, { status: 'accepted' });
      await base44.entities.EventPosting.update(eventId, { 
        status: 'booked',
        selected_operator_id: applications.find(a => a.id === applicationId)?.operator_profile_id
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['event', eventId]);
      queryClient.invalidateQueries(['event-applications', eventId]);
      toast.success('Operator selected and booked!');
    }
  });

  const handleApply = (e) => {
    e.preventDefault();
    applyMutation.mutate(applicationData);
  };

  const isOrganizer = currentUser?.email === event?.organizer_email;
  const hasApplied = applications.some(app => app.operator_email === currentUser?.email);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-[#969696]">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Event not found</h2>
          <Link to={createPageUrl('BrowseEvents')} className="text-[#FDD202] hover:underline">
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-black py-12 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to={createPageUrl('BrowseEvents')}
            className="inline-flex items-center gap-2 text-white hover:text-[#FDD202] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">{event.title}</h1>
              <div className="flex items-center gap-3">
                <Badge className={
                  event.status === 'open' ? 'bg-green-500' :
                  event.status === 'in_review' ? 'bg-blue-500' :
                  event.status === 'booked' ? 'bg-purple-500' : 'bg-gray-500'
                }>
                  {event.status}
                </Badge>
                <Badge variant="outline" className="bg-white">{event.event_type}</Badge>
              </div>
            </div>
            {!isOrganizer && event.status === 'open' && !hasApplied && (
              <Button
                onClick={() => setShowApplicationForm(true)}
                className="bg-[#FDD202] text-black hover:bg-[#f5c400]"
              >
                Apply for This Event
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details */}
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Event Details</h2>
              <p className="text-[#333333] mb-6 leading-relaxed">{event.description}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#FDD202]" />
                  <div>
                    <div className="text-sm text-[#969696]">Date</div>
                    <div className="font-semibold text-black">
                      {new Date(event.event_date).toLocaleDateString('en-AU', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>

                {event.event_time && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#FDD202]" />
                    <div>
                      <div className="text-sm text-[#969696]">Time</div>
                      <div className="font-semibold text-black">{event.event_time}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#FDD202]" />
                  <div>
                    <div className="text-sm text-[#969696]">Location</div>
                    <div className="font-semibold text-black">{event.location}, {event.state}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#FDD202]" />
                  <div>
                    <div className="text-sm text-[#969696]">Expected Attendees</div>
                    <div className="font-semibold text-black">{event.expected_attendees}</div>
                  </div>
                </div>

                {event.duration_hours && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#FDD202]" />
                    <div>
                      <div className="text-sm text-[#969696]">Duration</div>
                      <div className="font-semibold text-black">{event.duration_hours} hours</div>
                    </div>
                  </div>
                )}

                {event.budget && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-[#FDD202]" />
                    <div>
                      <div className="text-sm text-[#969696]">Budget</div>
                      <div className="font-semibold text-black">${event.budget.toLocaleString()}</div>
                    </div>
                  </div>
                )}
              </div>

              {event.services_needed?.length > 0 && (
                <div className="mt-6 pt-6 border-t border-[#DBDBDB]">
                  <div className="text-sm text-[#969696] mb-3">Services Needed</div>
                  <div className="flex flex-wrap gap-2">
                    {event.services_needed.map(service => (
                      <Badge key={service} variant="outline">{service}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {event.specific_requirements && (
                <div className="mt-6 pt-6 border-t border-[#DBDBDB]">
                  <div className="text-sm text-[#969696] mb-3">Specific Requirements</div>
                  <p className="text-[#333333]">{event.specific_requirements}</p>
                </div>
              )}
            </div>

            {/* Applications */}
            {isOrganizer && (
              <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
                <h2 className="text-2xl font-bold text-black mb-6">
                  Applications ({applications.length})
                </h2>

                {applications.length === 0 ? (
                  <p className="text-[#969696]">No applications yet</p>
                ) : (
                  <div className="space-y-4">
                    {applications.map(app => (
                      <div key={app.id} className="p-6 border border-[#DBDBDB] rounded-xl">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-black text-lg">{app.business_name}</h3>
                            <div className="text-sm text-[#969696] mt-1">
                              {app.operator_email} • {app.operator_phone}
                            </div>
                          </div>
                          <Badge className={
                            app.status === 'pending' ? 'bg-yellow-500' :
                            app.status === 'accepted' ? 'bg-green-500' :
                            'bg-red-500'
                          }>
                            {app.status}
                          </Badge>
                        </div>

                        {app.proposed_price && (
                          <div className="mb-3">
                            <span className="text-2xl font-bold text-[#FDD202]">
                              ${app.proposed_price.toLocaleString()}
                            </span>
                          </div>
                        )}

                        <p className="text-[#333333] mb-4">{app.message}</p>

                        {app.status === 'pending' && event.status === 'open' && (
                          <Button
                            onClick={() => acceptApplicationMutation.mutate({ applicationId: app.id })}
                            disabled={acceptApplicationMutation.isPending}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Accept & Book Operator
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Application Form */}
            <AnimatePresence>
              {showApplicationForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl p-8 border-2 border-[#FDD202]"
                >
                  <h2 className="text-2xl font-bold text-black mb-6">Apply for This Event</h2>
                  <form onSubmit={handleApply} className="space-y-6">
                    <div>
                      <Label>Business Name *</Label>
                      <Input
                        value={applicationData.business_name}
                        onChange={(e) => setApplicationData({...applicationData, business_name: e.target.value})}
                        placeholder="Your Coffee Co."
                        required
                        className="mt-2"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          value={applicationData.operator_email}
                          onChange={(e) => setApplicationData({...applicationData, operator_email: e.target.value})}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Phone *</Label>
                        <Input
                          type="tel"
                          value={applicationData.operator_phone}
                          onChange={(e) => setApplicationData({...applicationData, operator_phone: e.target.value})}
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Proposed Price (AUD)</Label>
                      <Input
                        type="number"
                        value={applicationData.proposed_price}
                        onChange={(e) => setApplicationData({...applicationData, proposed_price: e.target.value})}
                        placeholder="Your quote for this event"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Your Message *</Label>
                      <Textarea
                        value={applicationData.message}
                        onChange={(e) => setApplicationData({...applicationData, message: e.target.value})}
                        placeholder="Why you're a great fit for this event..."
                        required
                        className="mt-2 min-h-[120px]"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowApplicationForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={applyMutation.isPending}
                        className="bg-[#FDD202] text-black hover:bg-[#f5c400]"
                      >
                        {applyMutation.isPending ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#DBDBDB]">
              <h3 className="font-bold text-black mb-4">Organizer Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-[#FDD202]" />
                  <a href={`mailto:${event.organizer_email}`} className="text-[#333333] hover:text-[#FDD202]">
                    {event.organizer_email}
                  </a>
                </div>
                {event.organizer_phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-[#FDD202]" />
                    <a href={`tel:${event.organizer_phone}`} className="text-[#333333] hover:text-[#FDD202]">
                      {event.organizer_phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {hasApplied && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-bold text-black mb-2">Application Submitted</h3>
                <p className="text-sm text-[#333333]">
                  You've applied for this event. The organizer will review your application and get in touch.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}