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
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-8 py-16">
      <div className="absolute top-0 left-0 w-full h-full bg-almost-black opacity-90 z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto z-10 w-full relative"
      >
        {/* Left host logo - CryptoSI */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 hidden md:block"
        >
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-yellow">
            <Image
              src="/images/Cryptosi.jpg"
              alt="CryptoSI"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Main content */}
        <div className="max-w-3xl mx-auto">
          <div 
            className="flex justify-center mb-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="text-5xl md:text-7xl font-bold inline-block"
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

          <h2 className="text-3xl md:text-4xl font-medium text-light-grey mb-8">
            Where Finance Meets Crypto
          </h2>
          
          <h3 className="text-xl md:text-2xl font-medium text-teal mb-8">
            Your Weekly Crypto Livestream
          </h3>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
            <div className="flex items-center text-teal font-medium">
              <span className="text-yellow text-2xl mr-2">🎙</span>
              LIVE every Monday at 6 PM UK Time
            </div>
            <div className="hidden md:block text-mid-grey">|</div>
            <div className="flex items-center text-teal font-medium">
              <span className="text-yellow text-2xl mr-2">📊</span>
              Real-time insights & Market Analysis
            </div>
          </div>

          {/* Mobile host logos */}
          <div className="flex justify-between mb-8 md:hidden">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-yellow">
              <Image
                src="/images/Cryptosi.jpg"
                alt="CryptoSI"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-yellow">
              <Image
                src="/images/fnwaffle.png"
                alt="Financial Navigator"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://www.instagram.com/financial_navigator_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-teal text-almost-black font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300"
            >
              Watch Live on Instagram
            </a>
            <a 
              href="https://www.youtube.com/playlist?list=PLmFN-F-XHywZZLYh95RFY0utC2TeYRZMm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-yellow text-almost-black font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300"
            >
              Past Episodes on YouTube
            </a>
          </div>
        </div>

        {/* Right host logo - Financial Navigator */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden md:block"
        >
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-yellow">
            <Image
              src="/images/fnwaffle.png"
              alt="Financial Navigator"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ClientHero; 