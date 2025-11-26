import React from 'react';
import { render, screen } from '@testing-library/react';
import ClientAbout from '../ClientAbout'; // Adjust path as necessary

describe('ClientAbout Component', () => {
  test('renders the main heading', () => {
    render(<ClientAbout />);
    expect(screen.getByRole('heading', { name: /What is Crypto Waffle?/i })).toBeInTheDocument();
  });

  test('renders introductory paragraph', () => {
    render(<ClientAbout />);
    expect(screen.getByText(/Crypto Waffle isn't just another crypto show/i)).toBeInTheDocument();
  });

  test('renders the section about hosts', () => {
    render(<ClientAbout />);
    expect(screen.getByText(/Hosted by Financial Navigator.*and CryptoSI/i)).toBeInTheDocument();
  });

  test('renders the section about show format', () => {
    render(<ClientAbout />);
    expect(screen.getByText(/Each week, we dive deep into the world of cryptocurrency/i)).toBeInTheDocument();
  });

  test('renders the call to action or mission statement', () => {
    render(<ClientAbout />);
    expect(screen.getByText(/Join our community every Monday at 6 PM UK time/i)).toBeInTheDocument();
  });
}); 