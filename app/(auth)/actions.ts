'use server';
import 'server-only';

import { actionClient, ActionError } from '@/lib/safe-action';
import { MagicLinkSchema, RegisterSchema, SignInSchema } from '@/lib/validators';
import { redirect } from 'next/navigation';
import { signIn } from '@/server/auth';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

const DEFAULT_LOGIN_REDIRECT = '/';

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
  .action(async ({ parsedInput: { email, password }}) => {
    const { error } = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (error) throw error;

    revalidatePath('/');
    redirect(DEFAULT_LOGIN_REDIRECT);
  });

export const registerWithPassword = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { email, password }}) => {
    const parsedHeaders = await headers();
    const origin = parsedHeaders.get('origin');

    const { error } = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (error) throw error;

    revalidatePath('/');
    redirect(DEFAULT_LOGIN_REDIRECT);
  });

export const signInWithGoogle = async () => {
  const res = (await signIn('google', {
    redirect: false,
  })) as string;

  if (res) redirect(res);
  throw new ActionError('Failed to sign in with google.');
};
