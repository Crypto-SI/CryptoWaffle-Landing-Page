import React from 'react';
import { render, screen } from '@testing-library/react';
import ClientFooter from '../ClientFooter'; // Adjust path

// Mock next/image if needed for logo in footer
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('ClientFooter Component', () => {
  beforeEach(() => {
    render(<ClientFooter />);
  });

  test('renders the footer logo', () => {
    // Check if the logo image is present
    const logo = screen.getByRole('img', { name: /Crypto Waffle Logo/i });
    expect(logo).toBeInTheDocument();
    // Optionally check src if it's different from nav logo
  });

  test('renders the copyright text', () => {
    // Get current year dynamically
    const currentYear = new Date().getFullYear();
    // Use regex to match copyright text including the current year
    const copyrightRegex = new RegExp(`© ${currentYear} Crypto Waffle\. All rights reserved\.`, 'i');
    expect(screen.getByText(copyrightRegex)).toBeInTheDocument();
  });

  test('renders social media links', () => {
    // Check for links based on their accessible name (aria-label)
    expect(screen.getByLabelText(/YouTube/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Instagram/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Twitter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telegram/i)).toBeInTheDocument();
  });

  test('social media links have correct href attributes', () => {
    // Replace with actual social media URLs
    const expectedYoutubeUrl = 'YOUR_YOUTUBE_URL';
    const expectedInstagramUrl = 'YOUR_INSTAGRAM_URL';
    const expectedTwitterUrl = 'YOUR_TWITTER_URL';
    const expectedTelegramUrl = 'YOUR_TELEGRAM_URL';

    expect(screen.getByLabelText(/YouTube/i)).toHaveAttribute('href', expectedYoutubeUrl);
    expect(screen.getByLabelText(/Instagram/i)).toHaveAttribute('href', expectedInstagramUrl);
    expect(screen.getByLabelText(/Twitter/i)).toHaveAttribute('href', expectedTwitterUrl);
    expect(screen.getByLabelText(/Telegram/i)).toHaveAttribute('href', expectedTelegramUrl);
  });

  test('renders navigation links in footer', () => {
    // Check for footer-specific navigation links if they exist
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Hosts/i })).toBeInTheDocument();
    // Add other footer links as needed
  });
}); 