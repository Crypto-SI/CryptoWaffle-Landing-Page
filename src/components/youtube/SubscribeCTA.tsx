import React from 'react';
import { motion } from 'framer-motion';

import { AnimatedHeading } from './AnimatedHeading';

type SubscribeCTAProps = {
  playlistId: string;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
};

export const SubscribeCTA = ({ playlistId, isHovered, onHoverChange }: SubscribeCTAProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    viewport={{ once: true }}
    className="mt-16 text-center"
  >
    <div className="bg-dark-grey rounded-lg p-8 shadow-xl">
      <AnimatedHeading
        as="h3"
        text="Subscribe to Our Channel"
        className="text-2xl font-bold mb-4 inline-flex"
        isHovered={isHovered}
        onHoverChange={onHoverChange}
      />
      <p className="text-light-grey mb-6 max-w-3xl mx-auto">
        Never miss an episode! Subscribe to our YouTube channel and turn on notifications to stay updated with our latest
        crypto insights and analysis.
      </p>
      <a
        href={`https://www.youtube.com/playlist?list=${playlistId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#FF0000] text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all inline-flex items-center"
      >
        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
        Subscribe on YouTube
      </a>
    </div>
  </motion.div>
);
