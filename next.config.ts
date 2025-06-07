import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Optional: configure the plugin (e.g., with your default locale and path to messages)
const withNextIntl = createNextIntlPlugin({
  // You can define locale options here if needed
  // locales: ['en', 'ar'],
  // defaultLocale: 'en'
});

const nextConfig: NextConfig = {
  // your Next.js config options here
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/w40/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.creazilla.com',
        pathname: '/cliparts/**',
      },
      {
        protocol: 'https',
        hostname: 'media.roodx.com',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
