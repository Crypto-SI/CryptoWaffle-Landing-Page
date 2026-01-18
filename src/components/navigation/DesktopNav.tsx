import React from 'react';

import { DESKTOP_NAV_ITEMS, WATCH_LIVE } from './constants';
import { NavLinks } from './NavLinks';

export const DesktopNav = () => (
  <nav className="hidden md:flex items-center space-x-6">
    <NavLinks items={DESKTOP_NAV_ITEMS} linkClassName="text-light-grey hover:text-teal transition-colors" />
    <a
      href={WATCH_LIVE.href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-teal text-almost-black py-2 px-4 rounded-md hover:bg-opacity-90 transition-all"
    >
      {WATCH_LIVE.label}
    </a>
  </nav>
);
