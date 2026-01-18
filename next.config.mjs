/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: '.next',
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
  // Configure Turbopack to handle source maps properly
  turbopack: {
    // Enable debug IDs to improve source map generation
    debugIds: true,
  },
  // Disable production browser source maps to avoid issues
  productionBrowserSourceMaps: false,
};

export default nextConfig;
