import React from 'react';
import Image from 'next/image';
import Navigation from '../../components/Navigation';

const PartnersPage = () => {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-almost-black text-light-grey flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow mb-6">Our Partners</h1>
        <p className="text-lg md:text-xl max-w-2xl text-center mb-8">
          We're proud to collaborate with industry leaders and innovators. Stay tuned for our official partner announcements!
        </p>

        {/* WEEX Exchange Section */}
        <section className="w-full bg-dark-grey rounded-none shadow-lg p-0 md:p-0 mb-12">
          <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Logo */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-mid-grey rounded-lg flex items-center justify-center mb-4">
                <Image
                  src="/images/weex.png"
                  alt="WEEX Exchange Logo"
                  width={96}
                  height={96}
                  className="object-contain w-24 h-24"
                  priority
                />
              </div>
              <a
                href="https://support.weex.com/en/register?vipCode=vd7u"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:underline font-semibold"
              >
                Visit WEEX Exchange
              </a>
            </div>
            {/* Description */}
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-2xl font-bold text-yellow mb-2">WEEX Exchange</h2>
              <p className="mb-4 text-light-grey text-center md:text-left">
                WEEX is a leading global cryptocurrency exchange, offering secure trading, deep liquidity, and a user-friendly experience for both beginners and professionals. Explore spot and futures trading, advanced tools, and robust security features.
              </p>
            </div>
            {/* Video */}
            <div className="w-full aspect-video max-w-xl rounded-lg overflow-hidden shadow-md mx-auto">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/a9JBVf-EJeg"
                title="WEEX Exchange Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        {/* Hyperliquid DEX Section */}
        <section className="w-full bg-dark-grey rounded-none shadow-lg p-0 md:p-0 mb-12">
          <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Logo */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-mid-grey rounded-lg flex items-center justify-center mb-4">
                <Image
                  src="/images/hyperliquid.png"
                  alt="Hyperliquid DEX Logo"
                  width={96}
                  height={96}
                  className="object-contain w-24 h-24"
                  priority
                />
              </div>
              <a
                href="https://hyperliquid.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:underline font-semibold"
              >
                Visit Hyperliquid DEX
              </a>
            </div>
            {/* Description */}
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-2xl font-bold text-yellow mb-2">Hyperliquid DEX</h2>
              <p className="mb-4 text-light-grey text-center md:text-left">
                Hyperliquid is a next-generation decentralized exchange (DEX) offering lightning-fast trades, deep on-chain liquidity, and a seamless user experience. Trade a wide range of assets with full transparency and no intermediaries.
              </p>
            </div>
            {/* Video */}
            <div className="w-full aspect-video max-w-xl rounded-lg overflow-hidden shadow-md mx-auto">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/FG9fQD5xvMI"
                title="Hyperliquid DEX Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PartnersPage; 