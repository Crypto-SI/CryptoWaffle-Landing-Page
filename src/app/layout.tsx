import type { Metadata } from 'next';
import './globals.css';
import MailchimpPopup from '../components/MailchimpPopup';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Crypto Waffle - Where Finance Meets Crypto',
  description: 'Your weekly crypto livestream every Monday at 6PM UK Time, hosted by Financial Navigator & CryptoSI.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon-192x192.png',
        color: '#FFD700', // Use your brand color here (yellow/gold for Crypto Waffle)
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = headers();
  const nonce = (typeof headerList?.get === 'function' ? headerList.get('x-nonce') : undefined) || undefined;

  return (
    <html lang="en">
      <head>
        {/* Preload brand font stylesheet to reduce render-blocking */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Minimal critical styles for above-the-fold hero to avoid flash of unstyled content */}
        <style
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              body { margin: 0; background: #2A2B2D; color: #CDD6DF; font-family: 'Fredoka', sans-serif; }
              .hero-fold { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 4rem 1rem; }
              .hero-fold h1, .hero-fold h2, .hero-fold h3 { margin: 0; }
            `,
          }}
        />
      </head>
      <body>
        {children}
        <MailchimpPopup />
      </body>
    </html>
  );
} 
