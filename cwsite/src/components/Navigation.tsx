'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants for the text
  const letterVariants = {
    hover: {
      y: [0, -10, 0],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  // Split text into individual letters for animation
  const cryptoWaffleText = "Crypto Waffle";
  const letters = cryptoWaffleText.split("");

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-almost-black bg-opacity-95 py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-24 mr-2">
            <Image 
              src="/images/crypto-waffle-logo.png" 
              alt="Crypto Waffle Logo" 
              fill
              style={{ objectFit: 'contain' }}
              className="brightness-110"
              priority
            />
          </div>
          <div 
            className="flex" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                className="text-teal font-bold text-lg md:text-xl"
                variants={letterVariants}
                animate={isHovered ? "hover" : ""}
                custom={index}
                style={{ display: 'inline-block' }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#about" className="text-light-grey hover:text-teal transition-colors">
            About
          </Link>
          <Link href="#hosts" className="text-light-grey hover:text-teal transition-colors">
            Hosts
          </Link>
          <Link href="#episodes" className="text-light-grey hover:text-teal transition-colors">
            Episodes
          </Link>
          <Link 
            href="#telegram" 
            className="text-light-grey hover:text-teal transition-colors"
          >
            Community
          </Link>
          <Link href="#advertise" className="text-light-grey hover:text-teal transition-colors">
            Advertise
          </Link>
          <a 
            href="https://www.instagram.com/financial_navigator_"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-teal text-almost-black py-2 px-4 rounded-md hover:bg-opacity-90 transition-all"
          >
            Watch Live
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-light-grey"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-grey bg-opacity-95 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <div className="flex justify-center items-center mb-4">
              <div className="relative h-10 w-24 mr-2">
                <Image 
                  src="/images/crypto-waffle-logo.png" 
                  alt="Crypto Waffle Logo" 
                  fill
                  style={{ objectFit: 'contain' }}
                  className="brightness-110"
                />
              </div>
              <div className="flex">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-teal font-bold text-xl"
                    style={{ display: 'inline-block' }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </div>
            </div>
            <Link 
              href="#about" 
              className="text-light-grey hover:text-teal transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="#hosts" 
              className="text-light-grey hover:text-teal transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hosts
            </Link>
            <Link 
              href="#episodes" 
              className="text-light-grey hover:text-teal transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Episodes
            </Link>
            <Link 
              href="#telegram" 
              className="text-light-grey hover:text-teal transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              href="#advertise" 
              className="text-light-grey hover:text-teal transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Advertise
            </Link>
            <a 
              href="https://www.instagram.com/financial_navigator_"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal text-almost-black py-2 px-4 rounded-md hover:bg-opacity-90 transition-all inline-block w-full text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Watch Live
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation; 