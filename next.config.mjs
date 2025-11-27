/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: '/Users/cryptosi/Desktop/Vibe Coding/CryptoWaffle-Landing-Page',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
