import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter } from 'react-icons/fa';

const Hosts = () => {
  const hosts = [
    {
      name: 'Financial Navigator',
      role: 'Guiding your financial journey',
      bio: 'Expert advice on investments, savings, and planning for a secure future.',
      image: '/images/fnwaffle.webp',
      instagram: 'https://www.instagram.com/financial_navigator_',
      twitter: 'https://twitter.com/Alex_Codling_'
    },
    {
      name: 'CryptoSI',
      role: 'Crypto OG & Technical Expert',
      bio: 'A crypto OG with deep technical knowledge, sharing real-world experiences and insider tips from years in the industry.',
      image: '/images/CryptoSI3w.webp',
      instagram: 'https://www.instagram.com/cryptosi.eth',
      twitter: 'https://twitter.com/crypto_si'
    }
  ];

  return (
    <section id="hosts" className="py-20 px-4 md:px-8 bg-dark-grey">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Meet the Hosts</h2>
          <p className="text-lg max-w-3xl mx-auto">
            Our expert hosts bring together the perfect blend of financial insight and technical crypto knowledge
            to deliver an engaging and educational show every week.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {hosts.map((host, index) => (
            <motion.div
              key={host.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-almost-black rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-80 w-full">
              <Image
                src={host.image}
                alt={host.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-yellow mb-1">{host.name}</h3>
                <h4 className="text-teal font-medium mb-4">{host.role}</h4>
                <p className="mb-6 text-light-grey">{host.bio}</p>
                <div className="flex space-x-4">
                  <a
                    href={host.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal hover:text-yellow transition-colors"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href={host.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal hover:text-yellow transition-colors"
                  >
                    <FaTwitter size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hosts; 
