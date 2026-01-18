'use client';

import React, { useState } from 'react';

import { AboutIntro } from './about/AboutIntro';
import { ScheduleCard } from './about/ScheduleCard';
import { WhyJoinList } from './about/WhyJoinList';

const ClientAbout = () => {
  const [isH2Hovered, setIsH2Hovered] = useState(false);
  const [isH3Hovered1, setIsH3Hovered1] = useState(false);
  const [isH3Hovered2, setIsH3Hovered2] = useState(false);

  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-gradient-to-b from-almost-black to-dark-grey">
      <div className="container mx-auto max-w-6xl">
        <AboutIntro isHovered={isH2Hovered} onHoverChange={setIsH2Hovered} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <WhyJoinList isHovered={isH3Hovered1} onHoverChange={setIsH3Hovered1} />
          <ScheduleCard isHovered={isH3Hovered2} onHoverChange={setIsH3Hovered2} />
        </div>
      </div>
    </section>
  );
};

export default ClientAbout; 
