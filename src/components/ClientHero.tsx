'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ClientHero = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Brand colors to cycle through
  const brandColors = ["#43C4CC", "#FFD878"]; // teal, yellow
  
  // Split "Crypto Waffle" into individual letters for animation
  const cryptoWaffleText = "Crypto Waffle";
  const letters = cryptoWaffleText.split("");
  
  // Animation variants for the bouncing letters
  const letterVariants = {
    hover: (i: number) => ({
      y: [0, -20, 0],
      color: [
        brandColors[0], 
        brandColors[1], 
        brandColors[0]
      ],
      transition: {
        y: {
          duration: 0.6,
          repeat: Infinity,
          repeatType: "loop" as const,
          ease: "easeInOut",
          delay: i * 0.05 // stagger the animations
        },
        color: {
          duration: 1.2,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut",
          delay: i * 0.05
        }
      }
    }),
    initial: {
      y: 0,
      color: "#FFD878" // default yellow color
    }
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 text-center hero-fold md:px-8">
      <div className="absolute top-0 left-0 w-full h-full bg-almost-black opacity-90 z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto w-full max-w-5xl md:px-28 lg:px-24"
      >
        {/* Left host logo - CryptoSI */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute left-0 top-1/2 hidden -translate-y-1/2 md:block"
        >
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-yellow lg:h-32 lg:w-32">
            <Image
              src="/images/Cryptosi.webp"
              alt="CryptoSI"
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Main content */}
        <div className="mx-auto max-w-3xl">
          <div 
            className="mb-6 flex flex-wrap justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block text-4xl font-bold leading-none sm:text-5xl md:text-7xl"
                custom={i}
                variants={letterVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
                style={{ display: 'inline-block' }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>

          <h2 className="mb-6 text-2xl font-medium text-light-grey sm:text-3xl md:mb-8 md:text-4xl">
            Where Finance Meets Crypto
          </h2>
          
          <h3 className="mb-8 text-lg font-medium text-teal sm:text-xl md:text-2xl">
            Your Weekly Crypto Livestream
          </h3>
          
          <div className="mb-10 flex flex-col items-center gap-4 md:mb-12 md:flex-row md:justify-center">
            <div className="flex items-center justify-center text-center text-sm font-medium text-teal sm:text-base">
              <span className="text-yellow text-2xl mr-2">🎙</span>
              LIVE every Monday at 6 PM UK Time
            </div>
            <div className="hidden md:block text-mid-grey">|</div>
            <div className="flex items-center justify-center text-center text-sm font-medium text-teal sm:text-base">
              <span className="text-yellow text-2xl mr-2">📊</span>
              Real-time insights & Market Analysis
            </div>
          </div>

          {/* Mobile host logos */}
          <div className="mb-8 flex items-center justify-center gap-6 md:hidden">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-yellow">
              <Image
                src="/images/Cryptosi.webp"
                alt="CryptoSI"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-yellow">
              <Image
                src="/images/fnwaffle.webp"
                alt="Financial Navigator"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a 
              href="https://www.instagram.com/financial_navigator_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full rounded-md bg-teal px-6 py-3 font-bold text-almost-black transition-all duration-300 hover:bg-opacity-90 sm:w-auto"
            >
              Watch Live on Instagram
            </a>
            <a 
              href="https://www.youtube.com/@CryptoWaffleTV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full rounded-md bg-yellow px-6 py-3 font-bold text-almost-black transition-all duration-300 hover:bg-opacity-90 sm:w-auto"
            >
              Watch on CryptoWaffleTV
            </a>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-light-grey">
            Looking for earlier episodes from previous channels?{' '}
            <a href="/archive" className="font-semibold text-teal transition-colors hover:text-yellow">
              Visit the archive
            </a>
            .
          </p>
        </div>

        {/* Right host logo - Financial Navigator */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute right-0 top-1/2 hidden -translate-y-1/2 md:block"
        >
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-yellow lg:h-32 lg:w-32">
            <Image
              src="/images/fnwaffle.webp"
              alt="Financial Navigator"
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ClientHero; 
