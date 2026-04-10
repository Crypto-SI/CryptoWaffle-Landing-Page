import React from 'react';

import { DESKTOP_NAV_ITEMS, WATCH_LIVE } from './constants';
import { NavLinks } from './NavLinks';

export const DesktopNav = () => (
  <nav className="hidden lg:flex items-center gap-6">
    <NavLinks
      items={DESKTOP_NAV_ITEMS}
      className="flex items-center gap-6"
      linkClassName="relative inline-block text-light-grey transition-colors duration-300 hover:text-teal after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-teal after:transition-transform after:duration-300 hover:after:scale-x-100"
    />
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
