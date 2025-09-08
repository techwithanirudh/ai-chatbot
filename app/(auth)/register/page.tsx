import type { Metadata } from 'next';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { MagicLinkForm } from '@/components/auth/magic-form';
import { MessageSquare } from 'lucide-react';
import { AbstractImage } from '../abstract-image';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register to Chatbot',
};

export const dynamic = 'force-dynamic';

export default function RegisterPage() {
  return (
    <>
      <div className="container relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full lg:block p-4">
          <AbstractImage />
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
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <CardWrapper
              backButtonLabel="Already have an account?"
              backButtonLinkLabel="Login"
              backButtonHref="/login"
              showSocial
              showCredentials
            >
              <MagicLinkForm />
            </CardWrapper>
          </div>
        </div>
      </div>
    </>
  );
}
