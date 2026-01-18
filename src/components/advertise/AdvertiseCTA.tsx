import React from 'react';
import { motion } from 'framer-motion';

import { AnimatedHeading } from './AnimatedHeading';

type AdvertiseCTAProps = {
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
};

export const AdvertiseCTA = ({ isHovered, onHoverChange }: AdvertiseCTAProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <AnimatedHeading
      as="h3"
      text="Ready to Reach Our Audience?"
      className="text-2xl font-bold mb-4 inline-flex"
      isHovered={isHovered}
      onHoverChange={onHoverChange}
    />
    <p className="text-light-grey mb-8 max-w-3xl mx-auto">
      We offer customized advertising packages to suit your brand's goals and budget. Let's discuss how we can create a
      partnership that delivers results for your business.
    </p>
    <a
      href="mailto:info@cryptowaffle.fun"
      className="bg-teal hover:bg-teal-600 text-almost-black font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      Contact Us About Advertising
    </a>
  </motion.div>
);
