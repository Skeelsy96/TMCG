import React from 'react';
import { ArrowLeft, Calendar, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function BookCall() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-black py-12 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to={createPageUrl('TMCGHome')}
            className="inline-flex items-center gap-2 text-white hover:text-[#FDD202] transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">
            Book Your <span className="text-[#FDD202]">Free Consultation</span>
          </h1>
          <p className="text-[#969696] text-lg">
            Choose a time that works for you and speak directly with our team
          </p>
        </div>
      </div>

      {/* Booking Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-6 text-center border border-[#DBDBDB]">
            <div className="w-12 h-12 bg-[#FDD202]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-[#FDD202]" />
            </div>
            <h3 className="font-bold text-black mb-2">Phone Consultation</h3>
            <p className="text-sm text-[#333333]">Direct call with our Business Development Manager</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-[#DBDBDB]">
            <div className="w-12 h-12 bg-[#FDD202]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-[#FDD202]" />
            </div>
            <h3 className="font-bold text-black mb-2">15 Minutes</h3>
            <p className="text-sm text-[#333333]">Quick, focused discussion about your goals</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-[#DBDBDB]">
            <div className="w-12 h-12 bg-[#FDD202]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-[#FDD202]" />
            </div>
            <h3 className="font-bold text-black mb-2">Instant Booking</h3>
            <p className="text-sm text-[#333333]">See available times and book immediately</p>
          </div>
        </div>

        {/* Google Calendar Iframe */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <iframe 
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2dh9yagVZ217DA70maiVNanT4ngbs0id7gz80ZZN8MJCWG_gonsBorZWCH_fj9hFn4FVWIay36?gv=true" 
            style={{ border: 0 }} 
            width="100%" 
            height="700" 
            frameBorder="0"
            title="Book a consultation with The Mobile Coffee Group"
          />
        </div>

        {/* What to Expect */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-[#DBDBDB]">
          <h2 className="text-2xl font-bold text-black mb-6">What to Expect During Your Call</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#FDD202] rounded-full flex items-center justify-center text-black font-bold">1</div>
              <div>
                <h3 className="font-semibold text-black mb-1">Discuss Your Goals</h3>
                <p className="text-sm text-[#333333]">We'll learn about your lifestyle aspirations and business objectives</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#FDD202] rounded-full flex items-center justify-center text-black font-bold">2</div>
              <div>
                <h3 className="font-semibold text-black mb-1">Review Van Options</h3>
                <p className="text-sm text-[#333333]">Explore which van package or fit-out best suits your needs</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#FDD202] rounded-full flex items-center justify-center text-black font-bold">3</div>
              <div>
                <h3 className="font-semibold text-black mb-1">Discuss Finance</h3>
                <p className="text-sm text-[#333333]">Learn about flexible finance options and payment structures</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#FDD202] rounded-full flex items-center justify-center text-black font-bold">4</div>
              <div>
                <h3 className="font-semibold text-black mb-1">Next Steps</h3>
                <p className="text-sm text-[#333333]">Outline the clear path from consultation to your first cup of coffee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}