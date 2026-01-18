import React from 'react';
import { motion } from 'framer-motion';

import { AnimatedHeading } from './AnimatedHeading';

type AdvertiseIntroProps = {
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
};

export const AdvertiseIntro = ({ isHovered, onHoverChange }: AdvertiseIntroProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="text-center mb-12"
  >
    <AnimatedHeading
      text="Advertise With Us"
      className="text-3xl md:text-4xl font-bold mb-6 inline-flex"
      isHovered={isHovered}
      onHoverChange={onHoverChange}
    />
    <p className="text-lg md:text-xl max-w-3xl mx-auto">
      Reach a highly engaged audience of crypto enthusiasts, traders, and investors. Partner with{' '}
      <span className="text-teal">Crypto Waffle</span> to showcase your brand to our growing community.
    </p>
  </motion.div>
);
