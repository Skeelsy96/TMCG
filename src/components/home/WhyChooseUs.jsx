import React from 'react';
import { Shield, Award, Users, Truck, Clock, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: 'Trusted Platform',
      description: 'Every listing is verified to ensure quality and authenticity for buyers.'
    },
    {
      icon: Award,
      title: '19+ Years Experience',
      description: 'Backed by The Mobile Coffee Group, Australia\'s leading coffee van manufacturer.'
    },
    {
      icon: Users,
      title: '900+ Vans Built',
      description: 'We know coffee vans inside and out, helping you make the right choice.'
    },
    {
      icon: Truck,
      title: 'Australia Wide',
      description: 'Browse vans from every state and territory across Australia.'
    },
    {
      icon: Clock,
      title: 'Quick Listings',
      description: 'Get your van listed and visible to buyers within 24 hours.'
    },
    {
      icon: HeartHandshake,
      title: 'Expert Support',
      description: 'Our team is here to help with any questions about buying or selling.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Why Choose <span className="text-[#F7B500]">Coffee Van Classifieds</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Part of The Mobile Coffee Group family, we're dedicated to helping Australians
            start and grow their mobile coffee businesses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl border border-gray-100 hover:border-[#F7B500]/30 hover:shadow-xl transition-all duration-500 bg-white"
            >
              <div className="w-14 h-14 bg-[#F7B500]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#F7B500] group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-[#F7B500] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}