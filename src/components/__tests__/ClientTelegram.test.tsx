import React from 'react';
import { render, screen } from '@testing-library/react';
import ClientTelegram from '../ClientTelegram'; // Adjust path

// Mock next/image if needed for logos/icons within this component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('ClientTelegram Component', () => {
  beforeEach(() => {
    render(<ClientTelegram />);
  });

  test('renders the main heading', () => {
    // Check for a heading related to Telegram Community or Premium
    expect(screen.getByRole('heading', { name: /Join the Conversation/i })).toBeInTheDocument();
  });

  test('renders the introductory text about the Telegram group', () => {
    expect(screen.getByText(/Connect with hosts and fellow enthusiasts/i)).toBeInTheDocument();
  });

  test('renders the call-to-action button/link for the Telegram group', () => {
    // Check for a button or link to join the main/free group or the premium group
    const joinButton = screen.getByRole('link', { name: /Join Telegram Group/i }); // Adjust name based on actual button text
    expect(joinButton).toBeInTheDocument();
    expect(joinButton).toHaveAttribute('href'); // Verify link exists
    // Potentially add a more specific href check: expect(joinButton).toHaveAttribute('href', 'EXPECTED_TELEGRAM_LINK');
  });

  // If there's a separate section/CTA for the Premium group, add tests for that:
  test.skip('renders the premium Telegram group CTA (if applicable)', () => {
    expect(screen.getByRole('heading', { name: /Unlock Premium Access/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Join Premium Group/i })).toBeInTheDocument();
  });

  test('renders the section container', () => {
    const section = document.querySelector('#telegram');
    expect(section).toBeInTheDocument();
  });
}); 