'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ClientAdvertise = () => {
  const [isH2Hovered, setIsH2Hovered] = useState(false);
  const [isReachAudienceHovered, setIsReachAudienceHovered] = useState(false);

  // Define brand colors for the animation
  const brandColors = ["#43C4CC", "#FFD878"]; // teal and yellow

  // Animation variants for the letters
  const letterVariants = {
    initial: { y: 0, color: "#FFD878" },
    hover: (i: number) => ({
      y: [0, -10, 0],
      color: [brandColors[0], brandColors[1], brandColors[0]],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse" as const,
          duration: 0.5,
          delay: i * 0.05
        },
        color: {
          repeat: Infinity,
          repeatType: "reverse" as const,
          duration: 1,
          delay: i * 0.05
        }
      }
    })
  };

  return (
    <section id="advertise" className="py-20 px-4 md:px-8 bg-dark-grey">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-almost-black border border-dark-grey rounded-2xl p-8 md:p-10 shadow-2xl mb-16"
        >
          <div 
            className="inline-block"
            onMouseEnter={() => setIsH2Hovered(true)}
            onMouseLeave={() => setIsH2Hovered(false)}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-flex text-yellow">
              {"Book Us".split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  animate={isH2Hovered ? "hover" : "initial"}
                  style={{ display: 'inline-block' }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h2>
          </div>
          <p className="text-lg md:text-xl text-light-grey max-w-4xl mx-auto mb-8">
            We’re open to collaborations: book Crypto Waffle as guests on your show, or join us as a guest on ours.
            If you run a podcast, livestream, Twitter Space, or conference panel, let’s team up and bring actionable
            crypto + market insight to your audience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark-grey rounded-xl p-6 border border-almost-black">
              <h3 className="text-teal text-xl font-bold mb-2">Invite Us</h3>
              <p className="text-light-grey mb-4">
                Book Financial Navigator & CryptoSI to guest on your show, panel, or AMA.
                Expect sharp market takes, on-chain insight, and real-world crypto experience.
              </p>
              <ul className="space-y-2 text-sm text-mid-grey">
                <li>• Podcasts, livestreams, Twitter/X Spaces, conference panels</li>
                <li>• Market/DeFi/Narrative breakdowns tailored to your audience</li>
                <li>• No fluff—actionable and transparent</li>
              </ul>
            </div>
            <div className="bg-dark-grey rounded-xl p-6 border border-almost-black">
              <h3 className="text-teal text-xl font-bold mb-2">Be Our Guest</h3>
              <p className="text-light-grey mb-4">
                Join Crypto Waffle as a guest to share your story, product, or research with a tuned-in crypto crowd.
              </p>
              <ul className="space-y-2 text-sm text-mid-grey">
                <li>• Founders, researchers, analysts, traders welcome</li>
                <li>• Spotlight segments + Q&A</li>
                <li>• Audience of engaged crypto enthusiasts</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="mailto:cryptosi@protonmail.com?subject=Book%20Crypto%20Waffle"
              className="inline-block bg-teal text-almost-black font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300"
            >
              Book a Slot
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div 
            className="inline-block"
            onMouseEnter={() => setIsH2Hovered(true)}
            onMouseLeave={() => setIsH2Hovered(false)}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-flex">
              {"Advertise With Us".split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  animate={isH2Hovered ? "hover" : "initial"}
                  style={{ display: 'inline-block' }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h2>
          </div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Reach a highly engaged audience of crypto enthusiasts, traders, and investors. 
            Partner with <span className="text-teal">Crypto Waffle</span> to showcase your brand to our growing community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Audience Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-almost-black rounded-lg p-6 shadow-xl"
          >
            <div className="mb-4 text-yellow text-4xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-light-grey mb-3">Engaged Audience</h3>
            <p className="text-light-grey">
              Our community consists of dedicated crypto enthusiasts, traders, and investors looking for valuable insights and products.
            </p>
          </motion.div>

          {/* Targeted Marketing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-almost-black rounded-lg p-6 shadow-xl"
          >
            <div className="mb-4 text-yellow text-4xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-light-grey mb-3">Precision Targeting</h3>
            <p className="text-light-grey">
              Directly reach a crypto-focused audience, ensuring your marketing budget delivers maximum ROI and conversions.
            </p>
          </motion.div>

          {/* Multiple Formats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-almost-black rounded-lg p-6 shadow-xl"
          >
            <div className="mb-4 text-yellow text-4xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-light-grey mb-3">Flexible Options</h3>
            <p className="text-light-grey">
              Choose from various advertising formats including sponsored segments, logo placements, product reviews, and more.
            </p>
          </motion.div>
        </div>

        {/* Advertising Packages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-almost-black to-dark-grey rounded-xl p-8 shadow-2xl mb-16"
        >
          <h3 className="text-2xl font-bold text-teal mb-6">Advertising Opportunities</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal bg-opacity-20 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-light-grey font-bold mb-1">Sponsored Segments</h4>
                <p className="text-light-grey text-sm">Dedicated time in our episodes to showcase your product or service</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal bg-opacity-20 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-light-grey font-bold mb-1">Product Reviews</h4>
                <p className="text-light-grey text-sm">In-depth reviews and demonstrations of your product by our hosts</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal bg-opacity-20 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-light-grey font-bold mb-1">Website Banners</h4>
                <p className="text-light-grey text-sm">Prominent banner placements on our website and episode descriptions</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal bg-opacity-20 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-light-grey font-bold mb-1">Social Media Promotions</h4>
                <p className="text-light-grey text-sm">Dedicated posts about your brand across our social media channels</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div 
            className="inline-block"
            onMouseEnter={() => setIsReachAudienceHovered(true)}
            onMouseLeave={() => setIsReachAudienceHovered(false)}
          >
            <h3 className="text-2xl font-bold mb-4 inline-flex">
              {"Ready to Reach Our Audience?".split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  animate={isReachAudienceHovered ? "hover" : "initial"}
                  style={{ display: 'inline-block' }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h3>
          </div>
          <p className="text-light-grey mb-8 max-w-3xl mx-auto">
            We offer customized advertising packages to suit your brand's goals and budget. 
            Let's discuss how we can create a partnership that delivers results for your business.
          </p>
          <a 
            href="mailto:info@cryptowaffle.fun" 
            className="bg-teal hover:bg-teal-600 text-almost-black font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Us About Advertising
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientAdvertise; 
