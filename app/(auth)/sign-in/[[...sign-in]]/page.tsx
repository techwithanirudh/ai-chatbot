import type { Metadata } from 'next';
// import { Chat } from '@/components/icons';

import { MessageSquare } from 'lucide-react';
import { abstractImages } from '@/lib/images';

import {
  SignIn
} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to Chatbot',
};

export const dynamic = 'force-dynamic';

export default async function SignInPage() {
  const image =
    abstractImages[Math.floor(Math.random() * abstractImages.length)];

  return (
    <>
      <div className="container relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full rounded-3xl overflow-hidden lg:block p-4">
          <img
            src={image.url}
            className="object-cover size-full rounded-3xl"
            alt="Abstract background"
          />
          <div className="absolute bottom-6 left-7 text-primary-foreground">
            <p>
              Credit:{' '}
              <a href={image.author.url} className="underline">
                {image.author.name}
              </a>
            </p>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <SignIn />
          </div>
        </div>
      </div>
    </>
  );
}
