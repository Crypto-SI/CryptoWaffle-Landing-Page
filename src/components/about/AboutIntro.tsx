import React from 'react';
import { motion } from 'framer-motion';

import { AnimatedHeading } from './AnimatedHeading';

type AboutIntroProps = {
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
};

export const AboutIntro = ({ isHovered, onHoverChange }: AboutIntroProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    <AnimatedHeading
      text="What is Crypto Waffle?"
      className="text-3xl md:text-4xl font-bold mb-6 inline-flex"
      isHovered={isHovered}
      onHoverChange={onHoverChange}
    />
    <p className="text-lg md:text-xl max-w-3xl mx-auto">
      Crypto Waffle is a <span className="text-teal font-medium">weekly Instagram live show</span> where{' '}
      <span className="text-yellow font-medium">finance meets crypto technology</span>. Each{' '}
      <span className="text-teal font-medium">one-hour</span> episode is packed with expert insights, real-time
      analysis, and entertaining discussions on all things crypto.
    </p>
  </motion.div>
);
