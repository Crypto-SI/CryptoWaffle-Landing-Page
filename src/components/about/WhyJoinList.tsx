import React from 'react';
import { motion } from 'framer-motion';

import { AnimatedHeading } from './AnimatedHeading';

type WhyJoinListProps = {
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
};

const items = [
  {
    label: 'Stay Ahead',
    detail: 'Get real-time insights on the latest crypto trends and market movements'
  },
  {
    label: 'Learn & Earn',
    detail: 'Discover strategies to make money in crypto and understand blockchain tech'
  },
  {
    label: 'Engage in Real-Time',
    detail: 'Ask your burning questions and interact directly with our experts'
  },
  {
    label: 'Laugh & Learn',
    detail: 'Enjoy incredible stories from crypto veterans that make the complex world of crypto fun'
  }
];

export const WhyJoinList = ({ isHovered, onHoverChange }: WhyJoinListProps) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <AnimatedHeading
      as="h3"
      text="Why Join Crypto Waffle?"
      className="text-xl md:text-2xl font-medium mb-6 inline-flex"
      isHovered={isHovered}
      onHoverChange={onHoverChange}
    />
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.label} className="flex items-start">
          <span className="text-yellow text-xl mr-3">✓</span>
          <div>
            <span className="font-medium text-teal">{item.label}</span> – {item.detail}
          </div>
        </li>
      ))}
    </ul>
  </motion.div>
);
