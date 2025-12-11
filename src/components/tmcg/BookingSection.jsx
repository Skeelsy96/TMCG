import React, { useEffect } from 'react';
import { Calendar, Phone } from 'lucide-react';

export default function BookingSection() {
  useEffect(() => {
    // Load Google Calendar scheduling script
    const link = document.createElement('link');
    link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.calendar && window.calendar.schedulingButton) {
        const target = document.getElementById('calendar-button-target');
        if (target) {
          window.calendar.schedulingButton.load({
            url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2dh9yagVZ217DA70maiVNanT4ngbs0id7gz80ZZN8MJCWG_gonsBorZWCH_fj9hFn4FVWIay36?gv=true',
            color: '#ffd202',
            label: 'Book a 15 Min Phone Consultation',
            target: target
          });
        }
      }
    };

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-20 h-20 bg-[#FDD202]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="w-10 h-10 text-[#FDD202]" />
        </div>
        <h2 className="text-4xl font-bold text-black mb-4">
          Book a <span className="text-[#FDD202]">15-Minute Consultation</span>
        </h2>
        <p className="text-xl text-[#333333] mb-8 max-w-2xl mx-auto">
          Speak directly with our team about van packages, finance options, and your next steps to mobile coffee freedom.
        </p>
        
        <div className="flex justify-center h-20">
          <div id="calendar-button-target"></div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[#969696]">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>Phone Consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>15 Minutes</span>
          </div>
        </div>
      </div>
    </section>);

}