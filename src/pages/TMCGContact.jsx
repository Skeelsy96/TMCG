import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function TMCGContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement actual submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '1300 74 60 20',
      href: 'tel:1300746020'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@themobilecoffeegroup.com.au',
      href: 'mailto:info@themobilecoffeegroup.com.au'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Australia-Wide Service',
      href: null
    },
    {
      icon: Clock,
      title: 'Hours',
      value: 'Mon-Fri: 9am-5pm AEST',
      href: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <section className="bg-black py-16 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact <span className="text-[#FDD202]">Us</span>
          </h1>
          <p className="text-xl text-gray-400">
            Get in touch with our team — we're here to help you succeed
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-[#DBDBDB]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FDD202]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-[#FDD202]" />
                  </div>
                  <div>
                    <div className="font-medium text-black mb-1">{item.title}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[#333333] hover:text-[#FDD202] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-[#333333]">{item.value}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-black rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-4">Prefer to Book a Call?</h3>
              <Link
                to={createPageUrl('BookCall')}
                className="block w-full text-center bg-[#FDD202] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
              >
                Book 15-Min Consultation
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[#FDD202]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10 text-[#FDD202]" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">Message Sent!</h3>
                  <p className="text-[#333333] mb-8">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-black mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Smith"
                        required
                        className="mt-2"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="john@example.com"
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="0412 345 678"
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="How can we help you?"
                        required
                        className="mt-2 min-h-[150px]"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#FDD202] text-black hover:bg-[#f5c400] h-12 text-lg font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}