import type { Metadata } from 'next';
// import { Chat } from '@/components/icons';

import { CardWrapper } from '@/components/auth/card-wrapper';
import { LoginForm } from '@/components/auth/login-form';

import { MessageSquare } from 'lucide-react';
import { abstractImages } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to AI Tutor',
};

export default async function SignInPage() {
  const image =
    abstractImages[Math.floor(Math.random() * abstractImages.length)];

  return (
    <>
      <div className="container relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full rounded-3xl overflow-hidden lg:block p-4">
          <img
            src={image.url}
            className="object-cover w-full h-full rounded-3xl"
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
            <div className="flex flex-col space-y-2 text-center">
              <div className="flex items-center gap-2 justify-center">
                <div className="rounded-lg p-2 text-primary-foreground bg-zinc-900">
                  <MessageSquare className="size-6" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <CardWrapper
              backButtonLabel="No account?"
              backButtonLinkLabel="Register"
              backButtonHref="/register"
              showSocial
              showCredentials
            >
              <LoginForm />
            </CardWrapper>
            {/* <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/legal/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/legal/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
