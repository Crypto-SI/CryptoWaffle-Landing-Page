import React from 'react';
import { motion } from 'framer-motion';

import { AnimatedHeading } from './AnimatedHeading';

type PaymentOptionsProps = {
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
};

export const PaymentOptions = ({ isHovered, onHoverChange }: PaymentOptionsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    viewport={{ once: true }}
    className="text-center bg-dark-grey rounded-lg p-6 mb-8"
  >
    <AnimatedHeading
      as="h3"
      text="Flexible Payment Options"
      className="text-xl font-bold mb-4 inline-flex"
      isHovered={isHovered}
      onHoverChange={onHoverChange}
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-lg bg-almost-black p-4">
        <div className="flex justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="text-lg font-bold text-light-grey mb-2">Crypto Payment</h4>
        <p className="text-light-grey text-sm">Pay with Bitcoin, Ethereum, or other major cryptocurrencies</p>
      </div>
      <div className="rounded-lg bg-almost-black p-4">
        <div className="flex justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h4 className="text-lg font-bold text-light-grey mb-2">Card Payment</h4>
        <p className="text-light-grey text-sm">Secure payments via credit card or debit card</p>
      </div>
    </div>
  </motion.div>
);
