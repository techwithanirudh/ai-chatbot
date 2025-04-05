import NextAuth from 'next-auth';

import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import Keycloak from 'next-auth/providers/keycloak';
import { sendVerificationRequest } from '@/lib/magic-link';

import { authConfig } from './auth.config';

const providers = [];
if (
  process.env.AUTH_KEYCLOAK_ISSUER &&
  process.env.AUTH_KEYCLOAK_ID &&
  process.env.AUTH_KEYCLOAK_SECRET
) {
  providers.push(
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER,
    }),
  );
}

if (process.env.AUTH_RESEND_FROM && process.env.AUTH_RESEND_KEY) {
  providers.push(
    Resend({
      from: process.env.AUTH_RESEND_FROM,
      sendVerificationRequest,
    }),
  );
}

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  );
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers,
  debug: process.env.NODE_ENV === 'development',
});
