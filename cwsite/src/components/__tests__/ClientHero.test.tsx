import React from 'react';
import { render, screen } from '@testing-library/react';
import ClientHero from '../ClientHero'; // Adjust path as necessary

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('ClientHero Component', () => {
  test('renders the main headline', () => {
    render(<ClientHero />);
    // Use regex for flexibility with potential line breaks or extra whitespace
    expect(screen.getByRole('heading', { name: /Where Finance Meets Crypto/i })).toBeInTheDocument();
  });

  test('renders the subheading/description', () => {
    render(<ClientHero />);
    expect(screen.getByText(/Your weekly crypto livestream every Monday at 6PM UK Time/i)).toBeInTheDocument();
  });

  test('renders the "Watch Live" button/link', () => {
    render(<ClientHero />);
    expect(screen.getByRole('link', { name: /Watch Live/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Watch Live/i })).toHaveAttribute('href'); // Check if href exists
    // You might want to add a more specific href check if the link is constant
  });

  test('renders the main hero image', () => {
    render(<ClientHero />);
    // Assuming there's a main background or prominent image with identifiable alt text
    // Adjust the name regex based on the actual alt text used
    const heroImage = screen.getByRole('img', { name: /Crypto Waffle background/i });
    expect(heroImage).toBeInTheDocument();
  });
}); 