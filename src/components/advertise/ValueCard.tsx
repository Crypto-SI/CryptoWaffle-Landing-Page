import React from 'react';
import { motion } from 'framer-motion';

type ValueCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
};

export const ValueCard = ({ title, description, icon, delay }: ValueCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-almost-black rounded-lg p-6 shadow-xl"
  >
    <div className="mb-4 text-yellow text-4xl">{icon}</div>
    <h3 className="text-xl font-bold text-light-grey mb-3">{title}</h3>
    <p className="text-light-grey">{description}</p>
  </motion.div>
);
