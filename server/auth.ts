import NextAuth from 'next-auth';

import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import Credentials from "next-auth/providers/credentials"
import { sendVerificationRequest } from '@/lib/magic-link';

import { authConfig } from './auth.config';

const providers = []
if (process.env.NODE_ENV === "development") {
  providers.push(
    Credentials({
      credentials: {},
      authorize: ({ email, password }: any) => {
        if (password === (process.env.TEST_PASSWORD ?? 'password')) {
          return {
            email: email,
            name: "John Doe",
            image: "https://avatars.githubusercontent.com/u/67470890?s=200&v=4",
          }
        }

        return null;
      }
    })
  )
}

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
   ...providers
  ],
});
