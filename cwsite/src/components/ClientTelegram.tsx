'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ClientTelegram = () => {
  const [isH2Hovered, setIsH2Hovered] = useState(false);
  const [isCommunityHovered, setIsCommunityHovered] = useState(false);
  const [isVIPHovered, setIsVIPHovered] = useState(false);
  const [isPaymentHovered, setIsPaymentHovered] = useState(false);
  const [isJoinHovered, setIsJoinHovered] = useState(false);

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
    <section id="telegram" className="py-20 px-4 md:px-8 bg-almost-black border-t border-dark-grey">
      <div className="container mx-auto max-w-6xl">
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
              {"Join Our Telegram Community".split("").map((char, index) => (
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
            Get real-time market insights, trading signals, and connect with the 
            <span className="text-teal"> Financial Navigator's</span> exclusive community of crypto enthusiasts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-dark-grey rounded-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-dark-grey to-almost-black p-2 text-center">
              <span className="text-light-grey font-bold">FREE ACCESS</span>
            </div>
            <div className="p-8">
              <div 
                className="inline-block"
                onMouseEnter={() => setIsCommunityHovered(true)}
                onMouseLeave={() => setIsCommunityHovered(false)}
              >
                <h3 className="text-2xl font-bold mb-6 inline-flex">
                  {"Community Tier".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={letterVariants}
                      animate={isCommunityHovered ? "hover" : "initial"}
                      style={{ display: 'inline-block' }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </h3>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-light-grey">Daily market updates</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-light-grey">Community discussion</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-light-grey">Weekly market recaps</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-light-grey">Educational resources</span>
                </li>
              </ul>
              <div className="text-center">
                <span className="block text-yellow text-lg font-bold mb-6">FREE</span>
                <a 
                  href="https://t.me/+AVoimeTI8Ew5ZGQ0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-dark-grey border border-teal text-teal font-bold py-3 px-8 rounded-md hover:bg-teal hover:text-almost-black transition-colors"
                >
                  Join Free Channel
                </a>
              </div>
            </div>
          </motion.div>

          {/* Premium Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-dark-grey rounded-lg overflow-hidden relative"
          >
            {/* Premium Badge */}
            <div className="absolute -top-3 -right-3 bg-yellow text-almost-black text-xs font-bold py-1 px-3 rounded-full shadow-lg transform rotate-3">
              RECOMMENDED
            </div>
            <div className="bg-gradient-to-r from-teal to-teal-700 p-2 text-center">
              <span className="text-almost-black font-bold">PREMIUM ACCESS</span>
            </div>
            <div className="p-8">
              <div 
                className="inline-block"
                onMouseEnter={() => setIsVIPHovered(true)}
                onMouseLeave={() => setIsVIPHovered(false)}
              >
                <h3 className="text-2xl font-bold mb-6 inline-flex">
                  {"VIP Tier".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={letterVariants}
                      animate={isVIPHovered ? "hover" : "initial"}
                      style={{ display: 'inline-block' }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </h3>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-light-grey">Everything in Free tier</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-light-grey"><span className="text-yellow font-bold">Exclusive</span> trading signals</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-light-grey"><span className="text-yellow font-bold">Early access</span> to market analyses</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-light-grey"><span className="text-yellow font-bold">Private</span> Q&A sessions</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-light-grey">Financial Navigator's <span className="text-yellow font-bold">in-depth guides</span></span>
                </li>
              </ul>
              <div className="text-center">
                <span className="block text-yellow text-lg font-bold mb-6">$20 / month</span>
                <a 
                  href="https://t.me/+AVoimeTI8Ew5ZGQ0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-teal text-almost-black font-bold py-3 px-8 rounded-md hover:bg-yellow transition-colors"
                >
                  Join Premium Channel
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Payment Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center bg-dark-grey rounded-lg p-6 mb-8"
        >
          <div 
            className="inline-block"
            onMouseEnter={() => setIsPaymentHovered(true)}
            onMouseLeave={() => setIsPaymentHovered(false)}
          >
            <h3 className="text-xl font-bold mb-4 inline-flex">
              {"Flexible Payment Options".split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  animate={isPaymentHovered ? "hover" : "initial"}
                  style={{ display: 'inline-block' }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-almost-black p-4">
              <div className="flex justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-light-grey mb-2">Crypto Payment</h4>
              <p className="text-light-grey text-sm">Pay with Bitcoin, Ethereum, or other major cryptocurrencies</p>
            </div>
            <div className="rounded-lg bg-almost-black p-4">
              <div className="flex justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-light-grey mb-2">Card Payment</h4>
              <p className="text-light-grey text-sm">Secure payments via credit card or debit card</p>
            </div>
          </div>
        </motion.div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div 
            className="inline-block"
            onMouseEnter={() => setIsJoinHovered(true)}
            onMouseLeave={() => setIsJoinHovered(false)}
          >
            <h3 className="text-2xl font-bold mb-4 inline-flex">
              {"Join Financial Navigator's Guide to Wealth".split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  animate={isJoinHovered ? "hover" : "initial"}
                  style={{ display: 'inline-block' }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h3>
          </div>
          <p className="text-light-grey mb-8 max-w-3xl mx-auto">
            Don't miss out on expert insights that could transform your crypto journey. 
            Join our Telegram community today and get access to exclusive content designed to help you 
            navigate the crypto markets with confidence.
          </p>
          <a 
            href="https://t.me/+AVoimeTI8Ew5ZGQ0" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-yellow hover:bg-teal text-almost-black font-bold py-4 px-10 rounded-md transition-colors inline-flex items-center text-lg"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.035 4.587a7.446 7.446 0 0 1 5.278 2.1c.393.393.75.826 1.1 1.296a.1.1 0 0 1-.067.168H17.15a.1.1 0 0 0-.083.046 38.86 38.86 0 0 1-1.65 2.041.1.1 0 0 0 .03.14c.333.15.597.34.832.567a.1.1 0 0 1-.04.162c-.574.176-1.148.341-1.72.504a.099.099 0 0 0-.07.093c-.002 1.21-.008 2.42-.011 3.63 0 .34-.142.575-.438.77-.348.23-.7.456-1.055.674-.29.178-.582.166-.877.002-.5-.277-.993-.563-1.488-.847-.257-.148-.396-.38-.396-.708-.008-2.299-.015-4.599-.023-6.898 0-.111-.033-.18-.146-.208-.406-.1-.814-.195-1.218-.303-.294-.08-.403-.242-.332-.501.1-.36.18-.724.295-1.08.092-.28.23-.375.518-.375 1.486.003 6.261.003 7.826.003z" />
            </svg>
            Join Our Telegram Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientTelegram; 