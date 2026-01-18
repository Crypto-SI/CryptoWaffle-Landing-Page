import React from 'react';
import { motion } from 'framer-motion';

import { AnimatedHeading } from './AnimatedHeading';

type JoinCTAProps = {
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
};

export const JoinCTA = ({ isHovered, onHoverChange }: JoinCTAProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <AnimatedHeading
      as="h3"
      text="Join Financial Navigator's Guide to Wealth"
      className="text-2xl font-bold mb-4 inline-flex"
      isHovered={isHovered}
      onHoverChange={onHoverChange}
    />
    <p className="text-light-grey mb-8 max-w-3xl mx-auto">
      Don't miss out on expert insights that could transform your crypto journey. Join our Telegram community today and
      get access to exclusive content designed to help you navigate the crypto markets with confidence.
    </p>
    <a
      href="https://t.me/+AVoimeTI8Ew5ZGQ0"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-yellow hover:bg-teal text-almost-black font-bold py-4 px-10 rounded-md transition-colors inline-flex items-center text-lg"
    >
      <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.035 4.587a7.446 7.446 0 0 1 5.278 2.1c.393.393.75.826 1.1 1.296a.1.1 0 0 1-.067.168H17.15a.1.1 0 0 0-.083.046 38.86 38.86 0 0 1-1.65 2.041.1.1 0 0 0 .03.14c.333.15.597.34.832.567a.1.1 0 0 1-.04.162c-.574.176-1.148.341-1.72.504a.099.099 0 0 0-.07.093c-.002 1.21-.008 2.42-.011 3.63 0 .34-.142.575-.438.77-.348.23-.7.456-1.055.674-.29.178-.582.166-.877.002-.5-.277-.993-.563-1.488-.847-.257-.148-.396-.38-.396-.708-.008-2.299-.015-4.599-.023-6.898 0-.111-.033-.18-.146-.208-.406-.1-.814-.195-1.218-.303-.294-.08-.403-.242-.332-.501.1-.36.18-.724.295-1.08.092-.28.23-.375.518-.375 1.486.003 6.261.003 7.826.003z" />
      </svg>
      Join Our Telegram Now
    </a>
  </motion.div>
);
