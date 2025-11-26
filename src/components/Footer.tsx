import React from 'react';
import Image from 'next/image';
import { FaInstagram, FaTwitter, FaYoutube, FaTelegram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-almost-black py-12 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <Image 
              src="/images/crypto-waffle-logo.webp"
              alt="Crypto Waffle Logo"
              width={180}
              height={60}
              sizes="180px"
              className="h-auto"
            />
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://www.instagram.com/cryptosi.eth" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal hover:text-yellow transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a 
              href="https://twitter.com/crypto_si" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal hover:text-yellow transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter size={24} />
            </a>
            <a 
              href="https://www.youtube.com/playlist?list=PLmFN-F-XHywZZLYh95RFY0utC2TeYRZMm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal hover:text-yellow transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube size={24} />
            </a>
            <a 
              href="https://t.me/+AVoimeTI8Ew5ZGQ0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal hover:text-yellow transition-colors"
              aria-label="Telegram"
            >
              <FaTelegram size={24} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-dark-grey pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left text-mid-grey mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Crypto Waffle. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2">
              <a 
                href="https://t.me/+AVoimeTI8Ew5ZGQ0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-mid-grey hover:text-teal transition-colors text-sm"
              >
                Join Telegram
              </a>
              <a 
                href="https://www.youtube.com/@smartreach5326" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-mid-grey hover:text-teal transition-colors text-sm"
              >
                Smart Reach Channel
              </a>
              <a 
                href="https://chatgpt.com/g/g-67331c199b7c81909d45b5e5f30767d5-crypto-waffle-assistant" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-mid-grey hover:text-teal transition-colors text-sm"
              >
                Crypto Waffle Assistant
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
