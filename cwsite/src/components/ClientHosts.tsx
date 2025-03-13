'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Updated hosts data with correct names and social media links
const hosts = [
  {
    id: 1,
    name: "CryptoSI",
    realName: "Carl Si",
    role: "Host & Crypto Expert",
    bio: "A crypto OG with vast technical knowledge and a trove of experiences in the industry, sharing valuable stories and practical advice.",
    imageUrl: "/images/Cryptosi.jpg",
    instagramUrl: "https://www.instagram.com/cryptosi.eth",
    twitterUrl: "https://twitter.com/crypto_si",
    specialties: ["DAOs", "Blockchain tech", "tokenomics"]
  },
  {
    id: 2,
    name: "Financial Navigator",
    realName: "Alex Waffle",
    role: "Co-Host & Finance Analyst",
    bio: "An expert in macroeconomics and chart analysis, providing deep insights into market trends and indicators.",
    imageUrl: "/images/Financial navigator.jpg",
    instagramUrl: "https://www.instagram.com/financial_navigator_",
    twitterUrl: "https://twitter.com/Alex_Codling_",
    specialties: ["Macroeconomics", "Chart Analysis", "Market Indicators"]
  }
];

const ClientHosts = () => {
  const [isH2Hovered, setIsH2Hovered] = useState(false);

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
    <section id="hosts" className="py-20 px-4 md:px-8 bg-gradient-to-b from-dark-grey to-almost-black">
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
              {"Meet Your Hosts".split("").map((char, index) => (
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
            Get to know the crypto experts who bring you insights, analysis, and entertainment
            every week on Crypto Waffle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {hosts.map((host, index) => (
            <motion.div
              key={host.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-dark-grey rounded-lg overflow-hidden shadow-xl flex flex-col"
            >
              <div className="p-8 flex-1">
                <div className="mb-6 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden relative">
                    <Image 
                      src={host.imageUrl} 
                      alt={host.name} 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 128px"
                    />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-yellow text-center mb-2">{host.name}</h3>
                <p className="text-teal text-center font-medium mb-4">{host.role}</p>
                
                <p className="text-light-grey mb-6 text-center">
                  {host.bio}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm uppercase tracking-wider text-mid-grey mb-3 text-center">Specialties</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {host.specialties.map((specialty, i) => (
                      <span
                        key={i}
                        className="bg-almost-black text-teal py-1 px-3 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <a 
                    href={host.instagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-light-grey hover:text-teal transition-colors"
                    aria-label={`${host.name}'s Instagram`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href={host.twitterUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-light-grey hover:text-teal transition-colors"
                    aria-label={`${host.name}'s Twitter`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientHosts; 