import React from 'react';
import { motion } from 'framer-motion';

import { AnimatedHeading } from './AnimatedHeading';

type ScheduleCardProps = {
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
};

const scheduleItems = [
  { icon: '📅', label: 'When', value: 'Every Monday' },
  { icon: '⏰', label: 'Time', value: '6:00 PM UK Time' },
  { icon: '📱', label: 'Where', value: 'Instagram Live' },
  { icon: '⏱️', label: 'Duration', value: '1 Hour' }
];

export const ScheduleCard = ({ isHovered, onHoverChange }: ScheduleCardProps) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="p-8 bg-dark-grey rounded-lg shadow-xl"
  >
    <AnimatedHeading
      as="h3"
      text="Show Schedule"
      className="text-xl md:text-2xl font-medium mb-6 inline-flex"
      isHovered={isHovered}
      onHoverChange={onHoverChange}
    />
    <div className="space-y-4">
      {scheduleItems.map((item) => (
        <div key={item.label} className="flex items-center">
          <span className="text-yellow text-xl mr-3">{item.icon}</span>
          <div>
            <span className="font-medium text-teal">{item.label}:</span> {item.value}
          </div>
        </div>
      ))}
      <div className="mt-6">
        <a
          href="https://www.instagram.com/financial_navigator_"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-teal text-almost-black font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300 inline-block w-full text-center"
        >
          Set a Reminder
        </a>
      </div>
    </div>
  </motion.div>
);
