import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { SITE_NAME } from './constants';

const letterVariants = {
  hover: {
    y: [0, -10, 0],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: 'reverse' as const,
      ease: 'easeInOut' as const
    }
  }
};

type LogoProps = {
  isAnimated: boolean;
  isHovered?: boolean;
  onHoverChange?: (hovered: boolean) => void;
  textClassName: string;
};

export const Logo = ({ isAnimated, isHovered = false, onHoverChange, textClassName }: LogoProps) => {
  const letters = SITE_NAME.split('');

  return (
    <div className="flex min-w-0 items-center gap-2">
      <div className="relative h-9 w-20 shrink-0 sm:h-10 sm:w-24">
        <Image
          src="/images/crypto-waffle-logo.webp"
          alt="Crypto Waffle Logo"
          fill
          style={{ objectFit: 'contain' }}
          className="brightness-110"
          priority
          sizes="96px"
        />
      </div>
      <div
        className="flex min-w-0"
        onMouseEnter={onHoverChange ? () => onHoverChange(true) : undefined}
        onMouseLeave={onHoverChange ? () => onHoverChange(false) : undefined}
      >
        {letters.map((letter, index) =>
          isAnimated ? (
            <motion.span
              key={index}
              className={textClassName}
              variants={letterVariants}
              animate={isHovered ? 'hover' : ''}
              custom={index}
              style={{ display: 'inline-block' }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ) : (
            <span key={index} className={textClassName} style={{ display: 'inline-block' }}>
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          )
        )}
      </div>
    </div>
  );
};
