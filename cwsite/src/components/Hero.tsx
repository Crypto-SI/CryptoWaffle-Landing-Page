import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-8 py-16">
      <div className="absolute top-0 left-0 w-full h-full bg-almost-black opacity-90 z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto z-10"
      >
        <div className="flex justify-center mb-8">
          <Image 
            src="/images/crypto waffle logo.webp"
            alt="Crypto Waffle Logo"
            width={300}
            height={100}
            className="h-auto"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-yellow mb-4">
          Where Finance Meets Crypto
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-medium text-light-grey mb-8">
          Your Weekly Crypto Livestream
        </h2>
        
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
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="https://www.instagram.com/cryptosi.eth" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Watch Live on Instagram
          </a>
          <a 
            href="https://www.youtube.com/playlist?list=PLmFN-F-XHywZZLYh95RFY0utC2TeYRZMm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Past Episodes on YouTube
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 