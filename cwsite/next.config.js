/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['www.youtube.com', 'i.ytimg.com'],
    unoptimized: true,
  },
};

module.exports = nextConfig; 