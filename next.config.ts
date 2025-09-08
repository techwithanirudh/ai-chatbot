import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    serverActions: {
      allowedOrigins: [
        'psychic-winner-55p45jg5x75276xj-3000.app.github.dev',
        'localhost:3000',
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
      {
        // todo: store images locally
        hostname: 'images.unsplash.com',
      }
    ],
  },
};

export default nextConfig;
