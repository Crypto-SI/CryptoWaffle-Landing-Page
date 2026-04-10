import React from 'react';
import { render, screen } from '@testing-library/react';

import ClientSocialMedia from '../ClientSocialMedia';

describe('ClientSocialMedia', () => {
  beforeEach(() => {
    render(<ClientSocialMedia />);
  });

  test('renders the section heading', () => {
    expect(screen.getByRole('heading', { name: /Find Us Across Every Channel/i })).toBeInTheDocument();
  });

  test('renders the expected social links', () => {
    expect(screen.getByRole('link', { name: /Website: cryptowaffle.fun/i })).toHaveAttribute(
      'href',
      'https://www.cryptowaffle.fun/'
    );
    expect(screen.getByRole('link', { name: /Instagram: @cryptowaffle/i })).toHaveAttribute(
      'href',
      'https://www.instagram.com/cryptowaffle/'
    );
    expect(screen.getByRole('link', { name: /Telegram Free: Open community/i })).toHaveAttribute(
      'href',
      'https://t.me/+AVoimeTI8Ew5ZGQ0'
    );
    expect(screen.getByRole('link', { name: /Telegram VIP: Premium bot access/i })).toHaveAttribute(
      'href',
      'https://t.me/CryptoWaffleVIP_Bot?start=subscribe'
    );
    expect(screen.getByRole('link', { name: /TikTok: @crypto_waffle_/i })).toHaveAttribute(
      'href',
      'https://www.tiktok.com/@crypto_waffle_'
    );
    expect(screen.getByRole('link', { name: /YouTube: @CryptoWaffleTV/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/@CryptoWaffleTV'
    );
  });

  test('renders the socials section container', () => {
    expect(document.querySelector('#socials')).toBeInTheDocument();
  });
});
