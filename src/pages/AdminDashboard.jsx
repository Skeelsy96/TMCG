import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Users, Calendar, FileText, MessageSquare, TrendingUp, CheckCircle, Clock, XCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function AdminDashboard() {
  const { data: operatorApplications = [] } = useQuery({
    queryKey: ['admin-operator-applications'],
    queryFn: () => base44.entities.OperatorApplication.list()
  });

  const { data: events = [] } = useQuery({
    queryKey: ['admin-events'],
    queryFn: () => base44.entities.EventPosting.list()
  });

  const { data: feedback = [] } = useQuery({
    queryKey: ['admin-feedback'],
    queryFn: () => base44.entities.PlatformFeedback.list()
  });

  const stats = [
    {
      label: 'Pending Applications',
      value: operatorApplications.filter(a => a.status === 'pending').length,
      icon: Clock,
      color: 'bg-yellow-500',
      link: createPageUrl('AdminOperatorApplications')
    },
    {
      label: 'Active Events',
      value: events.filter(e => e.status === 'open' || e.status === 'in_review').length,
      icon: Calendar,
      color: 'bg-blue-500',
      link: createPageUrl('AdminEvents')
    },
    {
      label: 'New Feedback',
      value: feedback.filter(f => f.status === 'new').length,
      icon: MessageSquare,
      color: 'bg-purple-500',
      link: createPageUrl('AdminFeedback')
    },
    {
      label: 'Approved Operators',
      value: operatorApplications.filter(a => a.status === 'approved').length,
      icon: CheckCircle,
      color: 'bg-green-500',
      link: createPageUrl('AdminOperatorApplications')
    }
  ];

  const quickActions = [
    { 
      label: 'Operator Applications', 
      description: 'Review pending operator applications',
      icon: Users, 
      link: createPageUrl('AdminOperatorApplications'),
      badge: operatorApplications.filter(a => a.status === 'pending').length
    },
    { 
      label: 'Event Management', 
      description: 'Manage and monitor all events',
      icon: Calendar, 
      link: createPageUrl('AdminEvents')
    },
    { 
      label: 'User Feedback', 
      description: 'Review feedback and reports',
      icon: MessageSquare, 
      link: createPageUrl('AdminFeedback'),
      badge: feedback.filter(f => f.status === 'new').length
    },
    { 
      label: 'Content Management', 
      description: 'Manage blog articles and resources',
      icon: FileText, 
      link: createPageUrl('AdminContent')
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-black py-12 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Admin <span className="text-[#FDD202]">Dashboard</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Platform management and oversight
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-2xl p-6 border border-[#DBDBDB] hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-black">{stat.value}</div>
              </div>
              <div className="text-sm text-[#969696]">{stat.label}</div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-white rounded-2xl p-6 border border-[#DBDBDB] hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FDD202]/10 rounded-xl flex items-center justify-center group-hover:bg-[#FDD202]/20 transition-colors">
                    <action.icon className="w-6 h-6 text-[#FDD202]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-black text-lg">{action.label}</h3>
                      {action.badge > 0 && (
                        <span className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {action.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#969696]">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-[#DBDBDB]">
            <h3 className="font-bold text-black mb-4">Recent Operator Applications</h3>
            <div className="space-y-3">
              {operatorApplications.slice(0, 5).map(app => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-[#F5F5F5]">
                  <div>
                    <div className="font-semibold text-black text-sm">{app.business_name}</div>
                    <div className="text-xs text-[#969696]">{app.location}, {app.state}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    app.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#DBDBDB]">
            <h3 className="font-bold text-black mb-4">Recent Events</h3>
            <div className="space-y-3">
              {events.slice(0, 5).map(event => (
                <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-[#F5F5F5]">
                  <div>
                    <div className="font-semibold text-black text-sm">{event.title}</div>
                    <div className="text-xs text-[#969696]">
                      {new Date(event.event_date).toLocaleDateString()} • {event.location}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    event.status === 'open' ? 'bg-green-100 text-green-800' :
                    event.status === 'booked' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}