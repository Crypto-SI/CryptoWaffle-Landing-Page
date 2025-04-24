import React from 'react';
import { render, screen } from '@testing-library/react';
import ClientAdvertise from '../ClientAdvertise'; // Adjust path

// Mock next/image if needed
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('ClientAdvertise Component', () => {
  beforeEach(() => {
    render(<ClientAdvertise />);
  });

  test('renders the main heading', () => {
    // Check for a heading related to Advertising or Partnership
    expect(screen.getByRole('heading', { name: /Partner with Crypto Waffle/i })).toBeInTheDocument();
  });

  test('renders the introductory text about advertising', () => {
    expect(screen.getByText(/Reach a dedicated audience of crypto enthusiasts/i)).toBeInTheDocument();
  });

  test('renders the contact information or link', () => {
    // Check for an email link, contact form button, or specific contact details
    const contactLink = screen.getByRole('link', { name: /Get in Touch/i }); // Adjust name based on actual CTA
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href'); // Check for mailto: link or page link
    // Example: expect(contactLink).toHaveAttribute('href', 'mailto:advertise@cryptowaffle.example.com');
  });

  test('renders the section container', () => {
    const section = document.querySelector('#advertise');
    expect(section).toBeInTheDocument();
  });
}); 