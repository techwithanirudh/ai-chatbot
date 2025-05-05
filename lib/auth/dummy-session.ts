import type { Session } from '@/lib/auth/types';

// This dummy session should only be used in development
if (
  process.env.NODE_ENV === 'production' &&
  process.env.DISABLE_AUTH === 'true'
) {
  console.warn('Warning: Using dummy session in production environment');
}

export const dummySession: Session = {
  session: {
    userId: 1,
    // These values can be anything for the dummy user
    expiresAt: '2025-05-10T09:25:39.799Z',
    token: 'NpebIDsPAgTA8LCt3JeJXeDf3IY3cpxR',
    createdAt: '2025-05-03T09:25:39.799Z',
    updatedAt: '2025-05-03T09:25:39.799Z',
    ipAddress: '',
    userAgent: '',
    id: '233',
  },
  user: {
    id: 1,
    // These values can be anything for the dummy user
    name: 'John Doe',
    email: 'test@email.com',
    emailVerified: true,
    image: 'https://avatar.vercel.sh/1',
    createdAt: '2025-05-03T08:38:14.839Z',
    updatedAt: '2025-05-03T08:38:14.839Z',
    firstname: 'John',
    lastname: 'Doe',
    status: 4,
    phone: null,
    companyName: null,
    companySize: null,
    usagePlanned: null,
    botsApiKey: null,
  },
} as const;
