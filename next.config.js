/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.narayanahealth.org' },
      { protocol: 'https', hostname: 'cdn.narayanahealth.org' },
    ],
    formats: ['image/webp'],
  },
  // Performance
  compress: true,
  poweredByHeader: false,
  // Strict mode for better React warnings
  reactStrictMode: true,
};

module.exports = nextConfig;
