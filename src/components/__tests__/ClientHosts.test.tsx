import React from 'react';
import { render, screen } from '@testing-library/react';
import ClientHosts from '../ClientHosts'; // Adjust path as necessary

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('ClientHosts Component', () => {
  beforeEach(() => {
    render(<ClientHosts />);
  });

  test('renders the main heading', () => {
    expect(screen.getByRole('heading', { name: /Meet Your Hosts/i })).toBeInTheDocument();
  });

  test('renders CryptoSI details', () => {
    expect(screen.getByRole('heading', { name: /CryptoSI/i })).toBeInTheDocument();
    expect(screen.getByText(/Host & Crypto Expert/i)).toBeInTheDocument();
    expect(screen.getByText(/A crypto OG with vast technical knowledge/i)).toBeInTheDocument(); // Check partial bio
    expect(screen.getByAltText(/CryptoSI/i)).toHaveAttribute('src', '/images/Cryptosi.webp');
    expect(screen.getByText(/DAOs/i)).toBeInTheDocument();
    expect(screen.getByText(/Blockchain tech/i)).toBeInTheDocument();
    expect(screen.getByText(/tokenomics/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CryptoSI's Instagram/i)).toHaveAttribute('href', 'https://www.instagram.com/cryptosi.eth');
    expect(screen.getByLabelText(/CryptoSI's Twitter/i)).toHaveAttribute('href', 'https://twitter.com/crypto_si');
  });

  test('renders Financial Navigator details', () => {
    expect(screen.getByRole('heading', { name: /Financial Navigator/i })).toBeInTheDocument();
    expect(screen.getByText(/Co-Host & Finance Analyst/i)).toBeInTheDocument();
    expect(screen.getByText(/An expert in macroeconomics and chart analysis/i)).toBeInTheDocument(); // Check partial bio
    expect(screen.getByAltText(/Financial Navigator/i)).toHaveAttribute('src', '/images/fnwaffle.webp');
    expect(screen.getByText(/Macroeconomics/i)).toBeInTheDocument();
    expect(screen.getByText(/Chart Analysis/i)).toBeInTheDocument();
    expect(screen.getByText(/Market Indicators/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Financial Navigator's Instagram/i)).toHaveAttribute('href', 'https://www.instagram.com/financial_navigator_');
    expect(screen.getByLabelText(/Financial Navigator's Twitter/i)).toHaveAttribute('href', 'https://twitter.com/Alex_Codling_');
  });
}); 
