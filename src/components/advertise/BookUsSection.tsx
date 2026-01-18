import React from 'react';
import { motion } from 'framer-motion';

import { AnimatedHeading } from './AnimatedHeading';

type BookUsSectionProps = {
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
};

const cards = [
  {
    title: 'Invite Us',
    description:
      'Book Financial Navigator & CryptoSI to guest on your show, panel, or AMA. Expect sharp market takes, on-chain insight, and real-world crypto experience.',
    bullets: [
      'Podcasts, livestreams, Twitter/X Spaces, conference panels',
      'Market/DeFi/Narrative breakdowns tailored to your audience',
      'No fluff—actionable and transparent'
    ]
  },
  {
    title: 'Be Our Guest',
    description:
      'Join Crypto Waffle as a guest to share your story, product, or research with a tuned-in crypto crowd.',
    bullets: ['Founders, researchers, analysts, traders welcome', 'Spotlight segments + Q&A', 'Audience of engaged crypto enthusiasts']
  }
];

export const BookUsSection = ({ isHovered, onHoverChange }: BookUsSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="bg-almost-black border border-dark-grey rounded-2xl p-8 md:p-10 shadow-2xl mb-16"
  >
    <AnimatedHeading
      text="Book Us"
      className="text-3xl md:text-4xl font-bold mb-4 inline-flex text-yellow"
      isHovered={isHovered}
      onHoverChange={onHoverChange}
    />
    <p className="text-lg md:text-xl text-light-grey max-w-4xl mx-auto mb-8">
      We’re open to collaborations: book Crypto Waffle as guests on your show, or join us as a guest on ours. If you run
      a podcast, livestream, Twitter Space, or conference panel, let’s team up and bring actionable crypto + market
      insight to your audience.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card) => (
        <div key={card.title} className="bg-dark-grey rounded-xl p-6 border border-almost-black">
          <h3 className="text-teal text-xl font-bold mb-2">{card.title}</h3>
          <p className="text-light-grey mb-4">{card.description}</p>
          <ul className="space-y-2 text-sm text-mid-grey">
            {card.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
        </div>
      ))}
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
);
