'use client';

import { useSearchParams } from 'next/navigation';
import type { ErrorPageParam } from '@auth/core/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
enum Error {
  Configuration = 'Configuration',
}

interface ErrorView {
  status: number;
  heading: string;
  message: JSX.Element;
  signin?: JSX.Element;
}

const errorMap: Record<ErrorPageParam | 'default', ErrorView> = {
  default: {
    status: 200,
    heading: 'Error',
    message: (
      <p>
        <p>An unknown error occurred, please try again later</p>
      </p>
    ),
  },
  Configuration: {
    status: 500,
    heading: 'Server error',
    message: (
      <div>
        <p>There is a problem with the server configuration.</p>
        <p>Check the server logs for more information.</p>
      </div>
    ),
  },
  AccessDenied: {
    status: 403,
    heading: 'Access Denied',
    message: (
      <div>
        <p>You do not have permission to login.</p>
        <p>
          <Button asChild>
            <Link href={'/login'}>Login</Link>
          </Button>
        </p>
      </div>
    ),
  },
  Verification: {
    status: 403,
    heading: 'Unable to login',
    message: (
      <div>
        <p>The login link is no longer valid.</p>
        <p>It may have been used already or it may have expired.</p>
      </div>
    ),
    signin: (
      <Button asChild>
        <Link href={'/login'}>Login</Link>
      </Button>
    ),
  },
};

function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[176px] w-[384px] rounded-xl" />
    </div>
  );
}

function AuthErrorCard() {
  const search = useSearchParams();
  const error = search.get('error') as Error;

  return (
    <Card className="min-h-44 min-w-80 bg-muted/50 hover:bg-muted/80 md:min-w-96">
      <CardHeader>
        <CardTitle>
          {errorMap[error]?.heading || 'Something went wrong'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {errorMap[error]?.message ||
          'Please contact us if this error persists.'}
      </CardContent>
      <CardFooter>{errorMap[error]?.signin}</CardFooter>
    </Card>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="flex  h-dvh w-full flex-col items-center justify-center p-6">
      <Suspense fallback={<SkeletonCard />}>
        <AuthErrorCard />
      </Suspense>
    </div>
  );
}
