import { fileURLToPath } from 'node:url';
import bundleAnalyzer from '@next/bundle-analyzer';

import createJiti from 'jiti';
import type { NextConfig } from 'next';

const jiti = createJiti(fileURLToPath(import.meta.url));
jiti('./env');
import { env } from './env';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  // typedRoutes: true,
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
      {
        // todo: store images locally
        hostname: 'images.unsplash.com',
      },
    ],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Content-Security-Policy',
          value: "frame-ancestors 'self';",
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],
};

const bundleAnalyzerPlugin = bundleAnalyzer({
  enabled: env.ANALYZE === 'true',
});

const NextApp = () => {
  const plugins = [bundleAnalyzerPlugin];
  return plugins.reduce((config, plugin) => plugin(config), nextConfig);
};

export default NextApp;
