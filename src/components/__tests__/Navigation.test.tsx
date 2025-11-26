import React from 'react';
import { render, screen } from '@testing-library/react';
import Navigation from '../Navigation'; // Adjust the path as necessary

// Mock next/image if not already handled by Jest config
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('Navigation Component', () => {
  test('renders the main logo image', () => {
    render(<Navigation />);
    const logo = screen.getByRole('img', { name: /Crypto Waffle Logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/crypto-waffle-logo.webp');
  });

  test('renders the main navigation links', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Hosts/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Videos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Telegram/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Advertise/i })).toBeInTheDocument();
  });

  test('renders the premium link/button', () => {
    render(<Navigation />);
    // Assuming the premium link might be styled as a button but is semantically a link
    expect(screen.getByRole('link', { name: /Join Premium/i })).toBeInTheDocument();
  });

  test('navigation links have correct href attributes', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /About/i })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: /Hosts/i })).toHaveAttribute('href', '#hosts');
    expect(screen.getByRole('link', { name: /Videos/i })).toHaveAttribute('href', '#videos');
    expect(screen.getByRole('link', { name: /Telegram/i })).toHaveAttribute('href', '#telegram');
    expect(screen.getByRole('link', { name: /Advertise/i })).toHaveAttribute('href', '#advertise');
    expect(screen.getByRole('link', { name: /Join Premium/i })).toHaveAttribute('href', '#premium'); // Assuming premium link href
  });

  // Add more tests as needed, e.g., for mobile menu interactions if applicable
}); 
