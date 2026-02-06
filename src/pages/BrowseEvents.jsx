import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Calendar, MapPin, Users, DollarSign, Clock, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const STATES = ['All', 'NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'];

export default function BrowseEvents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [statusFilter, setStatusFilter] = useState('open');

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events', statusFilter],
    queryFn: () => base44.entities.EventPosts.filter({ status: statusFilter === 'all' ? undefined : statusFilter }, '-event_date')
  });

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'All' || event.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-black py-20 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            Browse <span className="text-[#FDD202]">Event Opportunities</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto text-center">
            Apply to service events in your area
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-[#DBDBDB]">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#969696]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                className="pl-10"
              />
            </div>

            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATES.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open Events</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="all">All Events</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="text-[#969696]">Loading events...</div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-[#969696] mb-4">No events found</div>
            <Link
              to={createPageUrl('PostEvent')}
              className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
            >
              Post an Event
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={createPageUrl('EventDetail') + `?id=${event.id}`}
                  className="block bg-white rounded-2xl overflow-hidden border border-[#DBDBDB] hover:shadow-lg transition-all h-full"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-black pr-4">{event.title}</h3>
                      <Badge className={
                        event.status === 'open' ? 'bg-green-500' :
                        event.status === 'in_review' ? 'bg-blue-500' :
                        event.status === 'booked' ? 'bg-purple-500' : 'bg-gray-500'
                      }>
                        {event.status}
                      </Badge>
                    </div>

                    <p className="text-[#333333] text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm text-[#333333]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#FDD202]" />
                        {new Date(event.event_date).toLocaleDateString('en-AU', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                        {event.event_time && ` • ${event.event_time}`}
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#FDD202]" />
                        {event.location} • {event.state}
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#FDD202]" />
                        {event.expected_attendees} attendees
                      </div>

                      {event.budget && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-[#FDD202]" />
                          Budget: ${event.budget.toLocaleString()}
                        </div>
                      )}

                      {event.applications_count > 0 && (
                        <div className="flex items-center gap-2 text-blue-600 font-semibold">
                          {event.applications_count} {event.applications_count === 1 ? 'application' : 'applications'}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#DBDBDB]">
                      <Badge variant="outline">{event.event_type}</Badge>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}