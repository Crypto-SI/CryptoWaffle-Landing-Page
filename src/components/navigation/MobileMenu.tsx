import React from 'react';

import { MOBILE_NAV_ITEMS, WATCH_LIVE } from './constants';
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';

type MobileMenuProps = {
  onClose: () => void;
};

export const MobileMenu = ({ onClose }: MobileMenuProps) => (
  <div className="md:hidden bg-dark-grey bg-opacity-95 py-4">
    <div className="container mx-auto px-4 flex flex-col space-y-4">
      <div className="flex justify-center items-center mb-4">
        <Logo isAnimated={false} textClassName="text-teal font-bold text-xl" />
      </div>
      <NavLinks
        items={MOBILE_NAV_ITEMS}
        className="flex flex-col space-y-4"
        linkClassName="text-light-grey hover:text-teal transition-colors py-2"
        onItemClick={onClose}
      />
      <a
        href={WATCH_LIVE.href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-teal text-almost-black py-2 px-4 rounded-md hover:bg-opacity-90 transition-all inline-block w-full text-center"
        onClick={onClose}
      >
        {WATCH_LIVE.label}
      </a>
    </div>
  </div>
);
