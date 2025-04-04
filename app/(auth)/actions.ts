'use server';
import 'server-only';

import { actionClient, ActionError } from '@/lib/safe-action';
import { MagicLinkSchema } from '@/lib/validators';
import { redirect } from 'next/navigation';
import { signIn } from '@/server/auth';

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

export const signInWithKeycloak = async () => {
  const res = (await signIn('keycloack', {
    redirect: false,
  })) as string;

  if (res) redirect(res);
  throw new ActionError('Failed to sign in with keycloak.');
};

export const signInWithGoogle = async () => {
  const res = (await signIn('google', {
    redirect: false,
  })) as string;

  if (res) redirect(res);
  throw new ActionError('Failed to sign in with google.');
};
