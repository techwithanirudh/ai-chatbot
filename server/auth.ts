import NextAuth from 'next-auth';

import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import Keycloak from 'next-auth/providers/keycloak';
import { sendVerificationRequest } from '@/lib/magic-link';
import { env } from '@/env';

import { authConfig } from './auth.config';

const providers = [];
if (
  env.AUTH_KEYCLOAK_ISSUER &&
  env.AUTH_KEYCLOAK_ID &&
  env.AUTH_KEYCLOAK_SECRET
) {
  providers.push(
    Keycloak({
      clientId: env.AUTH_KEYCLOAK_ID,
      clientSecret: env.AUTH_KEYCLOAK_SECRET,
      issuer: env.AUTH_KEYCLOAK_ISSUER,
    }),
  );
}

if (env.AUTH_RESEND_FROM && env.AUTH_RESEND_KEY) {
  providers.push(
    Resend({
      from: env.AUTH_RESEND_FROM,
      sendVerificationRequest,
    }),
  );
}

if (env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
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
  debug: env.NODE_ENV === 'development',
});
