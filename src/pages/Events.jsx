import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Calendar, MapPin, Users, Coffee, ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function Events() {
  const [showPostForm, setShowPostForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: '',
    event_date: '',
    location: '',
    state: '',
    expected_attendees: '',
    organizer_name: '',
    organizer_email: '',
    organizer_phone: ''
  });

  const queryClient = useQueryClient();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => base44.entities.Event.filter({ status: 'active' }, '-event_date', 50)
  });

  const createEventMutation = useMutation({
    mutationFn: (data) => base44.entities.Event.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setShowPostForm(false);
      setFormData({
        title: '',
        description: '',
        event_type: '',
        event_date: '',
        location: '',
        state: '',
        expected_attendees: '',
        organizer_name: '',
        organizer_email: '',
        organizer_phone: ''
      });
      toast.success('Event posted successfully!');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createEventMutation.mutate({
      ...formData,
      expected_attendees: formData.expected_attendees ? parseInt(formData.expected_attendees) : null,
      status: 'active'
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section with Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/693903e46b0f433668f86195/c7c5a8082_EventMarkets.jpg"
          alt="Coffee vans at events and markets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center px-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Coffee Vans For <span className="text-[#FDD202]">Events</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              The community hub connecting event organizers with coffee van operators across Australia
            </p>
            <Button
              onClick={() => setShowPostForm(true)}
              className="bg-[#FDD202] text-black hover:bg-[#f5c400] px-8 py-6 text-lg h-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Post an Event
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white border-b border-[#DBDBDB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Calendar className="w-12 h-12 text-[#FDD202] mx-auto mb-4" />
              <h3 className="font-bold text-black mb-2">Event Organizers</h3>
              <p className="text-[#333333] text-sm">Post your event and connect with local coffee van operators</p>
            </div>
            <div>
              <Coffee className="w-12 h-12 text-[#FDD202] mx-auto mb-4" />
              <h3 className="font-bold text-black mb-2">Coffee Van Operators</h3>
              <p className="text-[#333333] text-sm">Browse upcoming events in your area and grow your business</p>
              <Link to={createPageUrl('BrowseOperators')} className="text-[#FDD202] text-sm hover:underline inline-block mt-2">
                View Operator Directory →
              </Link>
            </div>
            <div>
              <Users className="w-12 h-12 text-[#FDD202] mx-auto mb-4" />
              <h3 className="font-bold text-black mb-2">Community Hub</h3>
              <p className="text-[#333333] text-sm">Strengthening connections in Australia's mobile coffee community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Post Event Form Modal */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full my-8"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">Post Your Event</h2>
                <button onClick={() => setShowPostForm(false)} className="text-[#969696] hover:text-black">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label>Event Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. Spring Markets at Central Park"
                    required
                    className="mt-2"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Event Type *</Label>
                    <Select value={formData.event_type} onValueChange={(value) => setFormData({...formData, event_type: value})} required>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                        <SelectItem value="Private Function">Private Function</SelectItem>
                        <SelectItem value="Market/Festival">Market/Festival</SelectItem>
                        <SelectItem value="Sports Event">Sports Event</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Location *</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="e.g. Sydney Olympic Park"
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
                  <Label>Expected Attendees</Label>
                  <Input
                    type="number"
                    value={formData.expected_attendees}
                    onChange={(e) => setFormData({...formData, expected_attendees: e.target.value})}
                    placeholder="e.g. 500"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Event Description *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your event, requirements for coffee service, setup details..."
                    required
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                <div className="border-t border-[#DBDBDB] pt-6">
                  <h3 className="font-semibold text-black mb-4">Your Contact Details</h3>
                  <div className="space-y-4">
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
                    <div className="grid md:grid-cols-2 gap-4">
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

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setShowPostForm(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#FDD202] text-black hover:bg-[#f5c400]">
                    {createEventMutation.isPending ? 'Posting...' : 'Post Event'}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Events List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black">Upcoming Events</h2>
            <Button
              onClick={() => setShowPostForm(true)}
              variant="outline"
              className="border-[#FDD202] text-[#FDD202] hover:bg-[#FDD202] hover:text-black"
            >
              <Plus className="w-4 h-4 mr-2" />
              Post Event
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-[#333333]">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#DBDBDB]">
              <Calendar className="w-16 h-16 text-[#969696] mx-auto mb-4" />
              <p className="text-[#333333] mb-4">No events posted yet. Be the first!</p>
              <Button onClick={() => setShowPostForm(true)} className="bg-[#FDD202] text-black hover:bg-[#f5c400]">
                Post Your Event
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-[#DBDBDB] hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="bg-[#FDD202]/10 text-[#FDD202] px-3 py-1 rounded-full text-sm font-medium border border-[#FDD202]">
                      {event.event_type}
                    </span>
                    <span className="text-xs text-[#969696] bg-[#F5F5F5] px-2 py-1 rounded">{event.state}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-black mb-2">{event.title}</h3>
                  <p className="text-[#333333] mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[#333333]">
                      <Calendar className="w-4 h-4 text-[#FDD202]" />
                      {new Date(event.event_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#333333]">
                      <MapPin className="w-4 h-4 text-[#FDD202]" />
                      {event.location}
                    </div>
                    {event.expected_attendees && (
                      <div className="flex items-center gap-2 text-sm text-[#333333]">
                        <Users className="w-4 h-4 text-[#FDD202]" />
                        ~{event.expected_attendees} attendees
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#DBDBDB]">
                    <p className="text-xs text-[#969696] mb-2">Organizer</p>
                    <p className="text-sm font-semibold text-black">{event.organizer_name}</p>
                    {event.organizer_email && (
                      <a href={`mailto:${event.organizer_email}`} className="text-sm text-[#FDD202] hover:underline">
                        Contact Organizer
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join The Mobile Coffee <span className="text-[#FDD202]">Community</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Whether you're organizing an event or operating a coffee van, we're here to strengthen connections across Australia's mobile coffee industry.
          </p>
          <Link
            to={createPageUrl('TMCGContact')}
            className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
          >
            Get In Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}