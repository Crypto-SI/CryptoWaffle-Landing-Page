import React from 'react';
import { motion } from 'framer-motion';

const opportunities = [
  {
    title: 'Sponsored Segments',
    description: 'Dedicated time in our episodes to showcase your product or service'
  },
  {
    title: 'Product Reviews',
    description: 'In-depth reviews and demonstrations of your product by our hosts'
  },
  {
    title: 'Website Banners',
    description: 'Prominent banner placements on our website and episode descriptions'
  },
  {
    title: 'Social Media Promotions',
    description: 'Dedicated posts about your brand across our social media channels'
  }
];

export const OpportunitiesSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
    className="bg-gradient-to-br from-almost-black to-dark-grey rounded-xl p-8 shadow-2xl mb-16"
  >
    <h3 className="text-2xl font-bold text-teal mb-6">Advertising Opportunities</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {opportunities.map((opportunity) => (
        <div key={opportunity.title} className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal bg-opacity-20 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-light-grey font-bold mb-1">{opportunity.title}</h4>
            <p className="text-light-grey text-sm">{opportunity.description}</p>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);
