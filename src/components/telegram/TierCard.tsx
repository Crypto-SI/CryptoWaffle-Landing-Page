import React from 'react';
import { motion } from 'framer-motion';

import { AnimatedHeading } from './AnimatedHeading';

type TierCardProps = {
  heading: string;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
  badgeText?: string;
  bannerClassName: string;
  bannerTextClassName: string;
  titleColorClassName: string;
  featureIconClassName: string;
  featureIconBgClassName: string;
  price: string;
  ctaText: string;
  ctaHref: string;
  ctaClassName: string;
  features: Array<React.ReactNode>;
  motionDelay: number;
  containerClassName: string;
};

export const TierCard = ({
  heading,
  isHovered,
  onHoverChange,
  badgeText,
  bannerClassName,
  bannerTextClassName,
  titleColorClassName,
  featureIconClassName,
  featureIconBgClassName,
  price,
  ctaText,
  ctaHref,
  ctaClassName,
  features,
  motionDelay,
  containerClassName
}: TierCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: motionDelay }}
    viewport={{ once: true }}
    className={containerClassName}
  >
    {badgeText && (
      <div className="absolute -top-5 right-2 bg-yellow text-almost-black text-xs font-bold py-1 px-3 rounded-full shadow-lg transform rotate-3 z-10">
        {badgeText}
      </div>
    )}
    <div className={bannerClassName}>
      <span className={bannerTextClassName}>{heading.toUpperCase()}</span>
    </div>
    <div className="p-8">
      <AnimatedHeading
        as="h3"
        text={heading}
        className={`text-2xl font-bold mb-6 inline-flex ${titleColorClassName}`}
        isHovered={isHovered}
        onHoverChange={onHoverChange}
      />
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={`${heading}-${index}`} className="flex items-start">
            <div
              className={`flex-shrink-0 h-6 w-6 rounded-full ${featureIconBgClassName} flex items-center justify-center mr-3 mt-0.5`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${featureIconClassName}`} viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-light-grey">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="text-center">
        <span className="block text-yellow text-lg font-bold mb-6">{price}</span>
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={ctaClassName}
        >
          {ctaText}
        </a>
      </div>
    </div>
  </motion.div>
);
