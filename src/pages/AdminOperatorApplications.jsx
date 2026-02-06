import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle, XCircle, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function AdminOperatorApplications() {
  const [selectedApp, setSelectedApp] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const queryClient = useQueryClient();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['operator-applications'],
    queryFn: () => base44.entities.OperatorApplications.list('-created_date', 100)
  });

  const approveApplicationMutation = useMutation({
    mutationFn: async (app) => {
      // Create operator profile
      await base44.entities.OperatorProfiles.create({
        business_name: app.business_name,
        operator_name: app.operator_name,
        bio: app.bio,
        van_description: app.van_description,
        services_offered: app.services_offered,
        event_types: app.event_types,
        location: app.location,
        state: app.state,
        coverage_area: app.coverage_area,
        profile_image: app.profile_image,
        gallery_images: app.gallery_images,
        contact_email: app.contact_email,
        contact_phone: app.contact_phone,
        website: app.website,
        social_instagram: app.social_instagram,
        social_facebook: app.social_facebook,
        built_by_tmcg: app.built_by_tmcg,
        verified: true,
        available_for_booking: true
      });
      
      // Update application status
      await base44.entities.OperatorApplications.update(app.id, {
        status: 'approved',
        admin_notes: adminNotes
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['operator-applications'] });
      setSelectedApp(null);
      setAdminNotes('');
      toast.success('Application approved and operator profile created!');
    }
  });

  const rejectApplicationMutation = useMutation({
    mutationFn: (appId) => base44.entities.OperatorApplication.update(appId, {
      status: 'rejected',
      admin_notes: adminNotes
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['operator-applications'] });
      setSelectedApp(null);
      setAdminNotes('');
      toast.success('Application rejected');
    }
  });

  const pendingApps = applications.filter(a => a.status === 'pending');
  const reviewedApps = applications.filter(a => a.status !== 'pending');

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">Operator Applications</h1>

        {/* Pending Applications */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6 text-[#FDD202]" />
            Pending Review ({pendingApps.length})
          </h2>

          {isLoading ? (
            <div className="text-center py-8 text-[#333333]">Loading...</div>
          ) : pendingApps.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-[#DBDBDB]">
              <p className="text-[#333333]">No pending applications</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingApps.map((app) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 border border-[#DBDBDB]"
                >
                  {app.profile_image && (
                    <img src={app.profile_image} alt={app.business_name} className="w-full h-40 object-cover rounded-lg mb-4" />
                  )}
                  <h3 className="text-xl font-bold text-black mb-2">{app.business_name}</h3>
                  <p className="text-sm text-[#333333] mb-1">{app.operator_name}</p>
                  <p className="text-sm text-[#969696] mb-4">{app.location}, {app.state}</p>
                  <Button onClick={() => setSelectedApp(app)} variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Review Application
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Reviewed Applications */}
        <div>
          <h2 className="text-xl font-bold text-black mb-4">Reviewed ({reviewedApps.length})</h2>
          <div className="bg-white rounded-2xl border border-[#DBDBDB] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#F5F5F5] border-b border-[#DBDBDB]">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-black">Business Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-black">Operator</th>
                  <th className="text-left p-4 text-sm font-semibold text-black">Location</th>
                  <th className="text-left p-4 text-sm font-semibold text-black">Status</th>
                </tr>
              </thead>
              <tbody>
                {reviewedApps.map((app) => (
                  <tr key={app.id} className="border-b border-[#DBDBDB] last:border-0">
                    <td className="p-4 text-sm text-black">{app.business_name}</td>
                    <td className="p-4 text-sm text-[#333333]">{app.operator_name}</td>
                    <td className="p-4 text-sm text-[#333333]">{app.location}, {app.state}</td>
                    <td className="p-4">
                      {app.status === 'approved' ? (
                        <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600 text-sm">
                          <XCircle className="w-4 h-4" />
                          Rejected
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-black mb-1">{selectedApp.business_name}</h2>
                  <p className="text-[#333333]">{selectedApp.operator_name}</p>
                </div>
                <button onClick={() => setSelectedApp(null)} className="text-[#969696] hover:text-black">✕</button>
              </div>

              <div className="space-y-6">
                {selectedApp.profile_image && (
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img src={selectedApp.profile_image} alt={selectedApp.business_name} className="w-full h-full object-cover" />
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-black mb-2">About</h3>
                  <p className="text-[#333333] whitespace-pre-line">{selectedApp.bio}</p>
                </div>

                {selectedApp.van_description && (
                  <div>
                    <h3 className="font-bold text-black mb-2">Van Description</h3>
                    <p className="text-[#333333]">{selectedApp.van_description}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-black mb-2">Services</h3>
                    <ul className="list-disc list-inside text-[#333333] text-sm">
                      {selectedApp.services_offered?.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-2">Event Types</h3>
                    <ul className="list-disc list-inside text-[#333333] text-sm">
                      {selectedApp.event_types?.map((e, i) => <li key={i}>{e}</li>)}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-black mb-2">Location</h3>
                  <p className="text-[#333333]">{selectedApp.location}, {selectedApp.state}</p>
                  {selectedApp.coverage_area && <p className="text-sm text-[#969696]">{selectedApp.coverage_area}</p>}
                </div>

                <div>
                  <h3 className="font-bold text-black mb-2">Contact</h3>
                  <p className="text-[#333333] text-sm">{selectedApp.contact_email}</p>
                  <p className="text-[#333333] text-sm">{selectedApp.contact_phone}</p>
                </div>

                {selectedApp.gallery_images?.length > 0 && (
                  <div>
                    <h3 className="font-bold text-black mb-2">Gallery</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {selectedApp.gallery_images.map((img, i) => (
                        <img key={i} src={img} alt="" className="w-full aspect-square object-cover rounded-lg" />
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-black mb-2">Admin Notes</h3>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add notes about this application..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex gap-4 pt-6 border-t border-[#DBDBDB]">
                  <Button
                    onClick={() => rejectApplicationMutation.mutate(selectedApp.id)}
                    disabled={approveApplicationMutation.isPending || rejectApplicationMutation.isPending}
                    variant="outline"
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => approveApplicationMutation.mutate(selectedApp)}
                    disabled={approveApplicationMutation.isPending || rejectApplicationMutation.isPending}
                    className="flex-1 bg-[#FDD202] text-black hover:bg-[#f5c400]"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve & Create Profile
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}