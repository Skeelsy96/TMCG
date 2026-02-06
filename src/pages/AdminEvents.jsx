import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, Calendar, MapPin, Users, Eye, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function AdminEvents() {
  const [statusFilter, setStatusFilter] = useState('all');
  const queryClient = useQueryClient();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['admin-events'],
    queryFn: () => base44.entities.EventPosts.list('-event_date')
  });

  const deleteEventMutation = useMutation({
    mutationFn: (id) => base44.entities.EventPosts.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-events']);
      toast.success('Event deleted');
    }
  });

  const filteredEvents = statusFilter === 'all' 
    ? events 
    : events.filter(e => e.status === statusFilter);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-black py-12 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to={createPageUrl('AdminDashboard')}
            className="inline-flex items-center gap-2 text-white hover:text-[#FDD202] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">
            Event <span className="text-[#FDD202]">Management</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Monitor and manage all platform events
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-[#969696]">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_review">In Review</SelectItem>
              <SelectItem value="booked">Booked</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-[#969696]">Loading events...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 text-[#969696]">No events found</div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#DBDBDB] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5F5F5] border-b border-[#DBDBDB]">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-[#333333]">Event</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#333333]">Date</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#333333]">Location</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#333333]">Organizer</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#333333]">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#333333]">Applications</th>
                    <th className="text-right p-4 text-sm font-semibold text-[#333333]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map(event => (
                    <tr key={event.id} className="border-b border-[#DBDBDB] hover:bg-[#F5F5F5]">
                      <td className="p-4">
                        <div className="font-semibold text-black">{event.title}</div>
                        <div className="text-sm text-[#969696]">{event.event_type}</div>
                      </td>
                      <td className="p-4 text-sm text-[#333333]">
                        {new Date(event.event_date).toLocaleDateString('en-AU')}
                      </td>
                      <td className="p-4 text-sm text-[#333333]">
                        {event.location}, {event.state}
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-[#333333]">{event.organizer_name}</div>
                        <div className="text-xs text-[#969696]">{event.organizer_email}</div>
                      </td>
                      <td className="p-4">
                        <Badge className={
                          event.status === 'open' ? 'bg-green-500' :
                          event.status === 'in_review' ? 'bg-blue-500' :
                          event.status === 'booked' ? 'bg-purple-500' :
                          event.status === 'completed' ? 'bg-gray-500' :
                          'bg-red-500'
                        }>
                          {event.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-[#333333]">
                        {event.applications_count || 0}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={createPageUrl('EventDetail') + `?id=${event.id}`}
                            className="p-2 hover:bg-[#FDD202]/10 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4 text-[#FDD202]" />
                          </Link>
                          <button
                            onClick={() => {
                              if (confirm('Delete this event?')) {
                                deleteEventMutation.mutate(event.id);
                              }
                            }}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}