import type { Metadata } from 'next';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: 'https://chat.vercel.ai',
      images: '/banner.png',
      siteName: 'AI Chatbot',
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@aisdk',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/banner.png',
      ...override.twitter,
    },
  };
}
