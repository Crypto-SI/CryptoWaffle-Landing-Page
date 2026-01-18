'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { AnimatedHeading } from './telegram/AnimatedHeading';
import { JoinCTA } from './telegram/JoinCTA';
import { PaymentOptions } from './telegram/PaymentOptions';
import { TierCard } from './telegram/TierCard';

const ClientTelegram = () => {
  const [isH2Hovered, setIsH2Hovered] = useState(false);
  const [isCommunityHovered, setIsCommunityHovered] = useState(false);
  const [isVIPHovered, setIsVIPHovered] = useState(false);
  const [isPaymentHovered, setIsPaymentHovered] = useState(false);
  const [isJoinHovered, setIsJoinHovered] = useState(false);

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
          <AnimatedHeading
            text="Join Our Telegram Community"
            className="text-3xl md:text-4xl font-bold mb-6 inline-flex"
            isHovered={isH2Hovered}
            onHoverChange={setIsH2Hovered}
          />
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Get real-time market insights, trading signals, and connect with the 
            <span className="text-teal"> Financial Navigator's</span> exclusive community of crypto enthusiasts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <TierCard
            heading="Community Tier"
            isHovered={isCommunityHovered}
            onHoverChange={setIsCommunityHovered}
            bannerClassName="bg-gradient-to-r from-dark-grey to-almost-black p-2 text-center"
            bannerTextClassName="text-light-grey font-bold"
            titleColorClassName=""
            featureIconClassName="text-teal"
            featureIconBgClassName="bg-teal bg-opacity-20"
            price="FREE"
            ctaText="Join Free Channel"
            ctaHref="https://t.me/+AVoimeTI8Ew5ZGQ0"
            ctaClassName="inline-block bg-dark-grey border border-teal text-teal font-bold py-3 px-8 rounded-md hover:bg-teal hover:text-almost-black transition-colors"
            features={[
              'Daily market updates',
              'Community discussion',
              'Weekly market recaps',
              'Educational resources'
            ]}
            motionDelay={0.1}
            containerClassName="bg-dark-grey rounded-lg overflow-hidden"
          />

          <TierCard
            heading="VIP Tier"
            isHovered={isVIPHovered}
            onHoverChange={setIsVIPHovered}
            badgeText="RECOMMENDED"
            bannerClassName="bg-gradient-to-r from-teal to-teal-700 p-2 text-center overflow-hidden"
            bannerTextClassName="text-almost-black font-bold"
            titleColorClassName=""
            featureIconClassName="text-yellow"
            featureIconBgClassName="bg-yellow bg-opacity-20"
            price="$20 / month"
            ctaText="Join Premium Channel"
            ctaHref="https://t.me/CryptoWaffleVIP_Bot?start=subscribe"
            ctaClassName="inline-block bg-teal text-almost-black font-bold py-3 px-8 rounded-md hover:bg-yellow transition-colors"
            features={[
              'Everything in Free tier',
              <>
                <span className="text-yellow font-bold">Exclusive</span> trading signals
              </>,
              <>
                <span className="text-yellow font-bold">Early access</span> to market analyses
              </>,
              <>
                <span className="text-yellow font-bold">Private</span> Q&A sessions
              </>,
              <>
                Financial Navigator&apos;s <span className="text-yellow font-bold">in-depth guides</span>
              </>
            ]}
            motionDelay={0.2}
            containerClassName="bg-dark-grey rounded-lg relative"
          />
        </div>

        <PaymentOptions isHovered={isPaymentHovered} onHoverChange={setIsPaymentHovered} />

        <JoinCTA isHovered={isJoinHovered} onHoverChange={setIsJoinHovered} />
      </div>
    </section>
  );
};

export default ClientTelegram; 
