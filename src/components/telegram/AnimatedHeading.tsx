import React from 'react';
import { motion } from 'framer-motion';

const BRAND_COLORS = ['#43C4CC', '#FFD878'];

const letterVariants = {
  initial: { y: 0, color: '#FFD878' },
  hover: (i: number) => ({
    y: [0, -10, 0],
    color: [BRAND_COLORS[0], BRAND_COLORS[1], BRAND_COLORS[0]],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: 'reverse' as const,
        duration: 0.5,
        delay: i * 0.05
      },
      color: {
        repeat: Infinity,
        repeatType: 'reverse' as const,
        duration: 1,
        delay: i * 0.05
      }
    }
  })
};

type AnimatedHeadingProps = {
  as?: React.ElementType;
  text: string;
  className: string;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
};

export const AnimatedHeading = ({
  as: HeadingTag = 'h2',
  text,
  className,
  isHovered,
  onHoverChange
}: AnimatedHeadingProps) => (
  <div className="inline-block" onMouseEnter={() => onHoverChange(true)} onMouseLeave={() => onHoverChange(false)}>
    <HeadingTag className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={`${text}-${index}`}
          custom={index}
          variants={letterVariants}
          animate={isHovered ? 'hover' : 'initial'}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </HeadingTag>
  </div>
);
