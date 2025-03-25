import NextAuth from 'next-auth';

import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import { sendVerificationRequest } from '@/lib/magic-link';

import { authConfig } from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Google,
    Resend({
      from: process.env.AUTH_RESEND_FROM,
      sendVerificationRequest,
    }),
  ],
});
