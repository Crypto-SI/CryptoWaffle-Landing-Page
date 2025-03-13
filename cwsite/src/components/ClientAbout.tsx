'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ClientAbout = () => {
  const [isH2Hovered, setIsH2Hovered] = useState(false);
  const [isH3Hovered1, setIsH3Hovered1] = useState(false);
  const [isH3Hovered2, setIsH3Hovered2] = useState(false);

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
    <section id="about" className="py-20 px-4 md:px-8 bg-gradient-to-b from-almost-black to-dark-grey">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div 
            className="inline-block"
            onMouseEnter={() => setIsH2Hovered(true)}
            onMouseLeave={() => setIsH2Hovered(false)}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-flex">
              {"What is Crypto Waffle?".split("").map((char, index) => (
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
            Crypto Waffle is a <span className="text-teal font-medium">weekly Instagram live show</span> where 
            <span className="text-yellow font-medium"> finance meets crypto technology</span>. Each 
            <span className="text-teal font-medium"> one-hour</span> episode is packed with expert insights, 
            real-time analysis, and entertaining discussions on all things crypto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div 
              className="inline-block"
              onMouseEnter={() => setIsH3Hovered1(true)}
              onMouseLeave={() => setIsH3Hovered1(false)}
            >
              <h3 className="text-xl md:text-2xl font-medium mb-6 inline-flex">
                {"Why Join Crypto Waffle?".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={letterVariants}
                    animate={isH3Hovered1 ? "hover" : "initial"}
                    style={{ display: 'inline-block' }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-yellow text-xl mr-3">✓</span>
                <div>
                  <span className="font-medium text-teal">Stay Ahead</span> – Get real-time insights on the 
                  latest crypto trends and market movements
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-yellow text-xl mr-3">✓</span>
                <div>
                  <span className="font-medium text-teal">Learn & Earn</span> – Discover strategies to make 
                  money in crypto and understand blockchain tech
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-yellow text-xl mr-3">✓</span>
                <div>
                  <span className="font-medium text-teal">Engage in Real-Time</span> – Ask your burning 
                  questions and interact directly with our experts
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-yellow text-xl mr-3">✓</span>
                <div>
                  <span className="font-medium text-teal">Laugh & Learn</span> – Enjoy incredible stories from 
                  crypto veterans that make the complex world of crypto fun
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-8 bg-dark-grey rounded-lg shadow-xl"
          >
            <div 
              className="inline-block"
              onMouseEnter={() => setIsH3Hovered2(true)}
              onMouseLeave={() => setIsH3Hovered2(false)}
            >
              <h3 className="text-xl md:text-2xl font-medium mb-6 inline-flex">
                {"Show Schedule".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={letterVariants}
                    animate={isH3Hovered2 ? "hover" : "initial"}
                    style={{ display: 'inline-block' }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-yellow text-xl mr-3">📅</span>
                <div>
                  <span className="font-medium text-teal">When:</span> Every Monday
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-yellow text-xl mr-3">⏰</span>
                <div>
                  <span className="font-medium text-teal">Time:</span> 6:00 PM UK Time
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-yellow text-xl mr-3">📱</span>
                <div>
                  <span className="font-medium text-teal">Where:</span> Instagram Live
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-yellow text-xl mr-3">⏱️</span>
                <div>
                  <span className="font-medium text-teal">Duration:</span> 1 Hour
                </div>
              </div>
              <div className="mt-6">
                <a 
                  href="https://www.instagram.com/financial_navigator_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-teal text-almost-black font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300 inline-block w-full text-center"
                >
                  Set a Reminder
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientAbout; 