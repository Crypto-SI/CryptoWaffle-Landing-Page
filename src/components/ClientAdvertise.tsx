'use client';

import React, { useState } from 'react';

import { AdvertiseCTA } from './advertise/AdvertiseCTA';
import { AdvertiseIntro } from './advertise/AdvertiseIntro';
import { BookUsSection } from './advertise/BookUsSection';
import { OpportunitiesSection } from './advertise/OpportunitiesSection';
import { ValueCards } from './advertise/ValueCards';

const ClientAdvertise = () => {
  const [isH2Hovered, setIsH2Hovered] = useState(false);
  const [isReachAudienceHovered, setIsReachAudienceHovered] = useState(false);

  return (
    <section id="advertise" className="py-20 px-4 md:px-8 bg-dark-grey">
      <div className="container mx-auto max-w-6xl">
        <BookUsSection isHovered={isH2Hovered} onHoverChange={setIsH2Hovered} />
        <AdvertiseIntro isHovered={isH2Hovered} onHoverChange={setIsH2Hovered} />
        <ValueCards />
        <OpportunitiesSection />
        <AdvertiseCTA isHovered={isReachAudienceHovered} onHoverChange={setIsReachAudienceHovered} />
      </div>
    </section>
  );
};

export default ClientAdvertise; 
