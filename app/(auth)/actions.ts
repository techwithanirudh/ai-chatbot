'use server';
import 'server-only';

import { actionClient, ActionError } from '@/lib/safe-action';
import {
  MagicLinkSchema,
  RegisterSchema,
  SignInSchema,
} from '@/lib/validators';
import { redirect } from 'next/navigation';
import { signIn } from '@/server/auth';
import { headers } from 'next/headers';

export const signInWithMagicLink = actionClient
  .schema(MagicLinkSchema)
  .action(async ({ parsedInput: { email } }) => {
    const res = (await signIn('resend', {
      email,
      redirect: false,
    })) as string;

    // if (res) redirect(res);
    // throw new ActionError("Failed to sign in with magic link.");
  });

export const signInWithPassword = actionClient
  .schema(SignInSchema)
  .action(async ({ parsedInput: { username, password } }) => {
    const res = (await signIn('keycloak', {
      username,
      password,
      redirect: false,
    })) as string;

    if (res) redirect(res);
  });

export const registerWithPassword = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { username, password } }) => {
    const parsedHeaders = await headers();
    const origin = parsedHeaders.get('origin');

    const res = (await signIn('keycloak', {
      username,
      password,
      redirect: false,
    })) as string;

    if (res) redirect(res);
  });

export const signInWithGoogle = async () => {
  const res = (await signIn('google', {
    redirect: false,
  })) as string;

  if (res) redirect(res);
  throw new ActionError('Failed to sign in with google.');
};
