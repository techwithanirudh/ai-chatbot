import type { Metadata } from 'next';
// import { Chat } from '@/components/icons';

import { abstractImages } from '@/lib/images';
import { SignUp } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register to Chatbot',
};

export const dynamic = 'force-dynamic';

export default function RegisterPage() {
  const image =
    abstractImages[Math.floor(Math.random() * abstractImages.length)];

  return (
    <>
      <div className="container relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full rounded-3xl overflow-hidden lg:block p-4">
          {/* todo: use next-image optimizations and limit urls available in next config */}
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
            <SignUp />
          </div>
        </div>
      </div>
    </>
  );
}
