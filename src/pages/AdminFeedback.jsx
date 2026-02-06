import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function AdminFeedback() {
  const [statusFilter, setStatusFilter] = useState('new');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const queryClient = useQueryClient();

  const { data: feedback = [], isLoading } = useQuery({
    queryKey: ['admin-feedback'],
    queryFn: () => base44.entities.FeedbackSubmissions.list('-created_date')
  });

  const updateFeedbackMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.FeedbackSubmissions.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-feedback']);
      toast.success('Feedback updated');
      setSelectedFeedback(null);
    }
  });

  const filteredFeedback = statusFilter === 'all' 
    ? feedback 
    : feedback.filter(f => f.status === statusFilter);

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
            User <span className="text-[#FDD202]">Feedback</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Review and manage user feedback and reports
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-[#969696]">
            {filteredFeedback.length} {filteredFeedback.length === 1 ? 'item' : 'items'}
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in_review">In Review</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-[#969696]">Loading feedback...</div>
        ) : filteredFeedback.length === 0 ? (
          <div className="text-center py-20 text-[#969696]">No feedback found</div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              {filteredFeedback.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedFeedback(item)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedFeedback?.id === item.id
                      ? 'border-[#FDD202] bg-[#FDD202]/5'
                      : 'border-[#DBDBDB] bg-white hover:border-[#FDD202]/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={
                      item.type === 'bug_report' ? 'bg-red-500' :
                      item.type === 'feature_request' ? 'bg-blue-500' :
                      item.type === 'complaint' ? 'bg-orange-500' :
                      item.type === 'compliment' ? 'bg-green-500' :
                      'bg-gray-500'
                    }>
                      {item.type.replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline">{item.status}</Badge>
                  </div>
                  <h3 className="font-bold text-black text-sm mb-1">{item.subject}</h3>
                  <p className="text-xs text-[#969696] line-clamp-2">{item.message}</p>
                  <div className="text-xs text-[#969696] mt-2">
                    {new Date(item.created_date).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              {selectedFeedback ? (
                <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-black mb-2">
                        {selectedFeedback.subject}
                      </h2>
                      <div className="flex items-center gap-2">
                        <Badge className={
                          selectedFeedback.type === 'bug_report' ? 'bg-red-500' :
                          selectedFeedback.type === 'feature_request' ? 'bg-blue-500' :
                          selectedFeedback.type === 'complaint' ? 'bg-orange-500' :
                          selectedFeedback.type === 'compliment' ? 'bg-green-500' :
                          'bg-gray-500'
                        }>
                          {selectedFeedback.type.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline">{selectedFeedback.status}</Badge>
                        <Badge variant="outline">{selectedFeedback.priority}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="text-sm text-[#969696] mb-2">Message</div>
                      <p className="text-[#333333]">{selectedFeedback.message}</p>
                    </div>

                    <div>
                      <div className="text-sm text-[#969696] mb-2">Contact</div>
                      <p className="text-[#333333]">{selectedFeedback.user_email || 'Anonymous'}</p>
                    </div>

                    <div>
                      <div className="text-sm text-[#969696] mb-2">Admin Notes</div>
                      <Textarea
                        value={selectedFeedback.admin_notes || ''}
                        onChange={(e) => setSelectedFeedback({
                          ...selectedFeedback,
                          admin_notes: e.target.value
                        })}
                        placeholder="Add internal notes..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Select
                        value={selectedFeedback.status}
                        onValueChange={(value) => setSelectedFeedback({
                          ...selectedFeedback,
                          status: value
                        })}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="in_review">In Review</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        onClick={() => updateFeedbackMutation.mutate({
                          id: selectedFeedback.id,
                          data: {
                            status: selectedFeedback.status,
                            admin_notes: selectedFeedback.admin_notes
                          }
                        })}
                        disabled={updateFeedbackMutation.isPending}
                        className="bg-[#FDD202] text-black hover:bg-[#f5c400]"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 border border-[#DBDBDB] text-center">
                  <MessageSquare className="w-16 h-16 text-[#969696] mx-auto mb-4" />
                  <p className="text-[#969696]">Select feedback to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}