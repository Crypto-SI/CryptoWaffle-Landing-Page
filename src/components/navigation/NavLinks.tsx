import React from 'react';
import Link from 'next/link';

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

type NavLinksProps = {
  items: NavItem[];
  className?: string;
  linkClassName?: string;
  onItemClick?: () => void;
};

export const NavLinks = ({ items, className, linkClassName, onItemClick }: NavLinksProps) => (
  <div className={className}>
    {items.map((item) =>
      item.external ? (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          onClick={onItemClick}
        >
          {item.label}
        </a>
      ) : (
        <Link key={item.label} href={item.href} className={linkClassName} onClick={onItemClick}>
          {item.label}
        </Link>
      )
    )}
  </div>
);
