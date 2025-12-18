import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Calendar, Users, Briefcase, PartyPopper, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

export default function Events() {
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    location: '',
    details: ''
  });

  const eventTypes = [
    { icon: Briefcase, title: 'Corporate Events', desc: 'Office functions, team building, conferences' },
    { icon: PartyPopper, title: 'Private Functions', desc: 'Weddings, birthdays, celebrations' },
    { icon: Calendar, title: 'Markets & Festivals', desc: 'Regular markets, food festivals, community events' },
    { icon: Users, title: 'Sports Events', desc: 'Tournaments, races, sports days' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <section className="bg-black py-20 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Events & <span className="text-[#FDD202]">Bookings Network</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Connecting event organizers with Australia's best mobile coffee operators
            </p>
          </motion.div>
        </div>
      </section>

      {/* User Type Selection */}
      {!userType && (
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black text-center mb-12">I am a...</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setUserType('organizer')}
                className="bg-white rounded-2xl p-12 border-2 border-[#DBDBDB] hover:border-[#FDD202] transition-all text-left"
              >
                <Calendar className="w-12 h-12 text-[#FDD202] mb-6" />
                <h3 className="text-2xl font-bold text-black mb-3">Event Organizer</h3>
                <p className="text-[#333333] mb-6">
                  I'm planning an event and need quality mobile coffee service
                </p>
                <div className="flex items-center gap-2 text-[#FDD202] font-semibold">
                  Request Coffee Vans
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setUserType('operator')}
                className="bg-white rounded-2xl p-12 border-2 border-[#DBDBDB] hover:border-[#FDD202] transition-all text-left"
              >
                <Coffee className="w-12 h-12 text-[#FDD202] mb-6" />
                <h3 className="text-2xl font-bold text-black mb-3">Coffee Van Owner</h3>
                <p className="text-[#333333] mb-6">
                  I operate a mobile coffee business and want to join the events network
                </p>
                <div className="flex items-center gap-2 text-[#FDD202] font-semibold">
                  Join Events Network
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.button>
            </div>
          </div>
        </section>
      )}

      {/* Event Organizer Form */}
      {userType === 'organizer' && (
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setUserType(null)}
              className="text-[#969696] hover:text-black mb-6"
            >
              ← Back
            </button>
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Request Coffee Vans for Your Event</h2>
              
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                {eventTypes.map((type) => (
                  <div key={type.title} className="text-center p-4 bg-[#F5F5F5] rounded-xl border border-[#DBDBDB]">
                    <type.icon className="w-8 h-8 text-[#FDD202] mx-auto mb-2" />
                    <p className="text-xs font-semibold text-black">{type.title}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Your Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Smith"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com"
                      className="mt-2"
                    />
                  </div>
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="0412 345 678"
                    className="mt-2"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Event Date</Label>
                    <Input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Sydney, NSW"
                      className="mt-2"
                    />
                  </div>
                </div>
                <div>
                  <Label>Event Details</Label>
                  <Textarea
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    placeholder="Tell us about your event, expected attendees, service requirements..."
                    className="mt-2 min-h-[120px]"
                  />
                </div>
                <Button className="w-full bg-[#FDD202] text-black hover:bg-[#f5c400] h-12">
                  Submit Event Request
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Operator Form */}
      {userType === 'operator' && (
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setUserType(null)}
              className="text-[#969696] hover:text-black mb-6"
            >
              ← Back
            </button>
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              <h2 className="text-2xl font-bold text-black mb-6">Join the TMCG Events Network</h2>
              <p className="text-[#333333] mb-8">
                Get access to premium event bookings, corporate clients, and regular market opportunities. 
                Available to TMCG van owners and approved operators.
              </p>
              <Link
                to={createPageUrl('TMCGContact')}
                className="block w-full text-center bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
              >
                Contact Us to Join
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}