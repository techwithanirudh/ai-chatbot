'use client';
import { Button } from '@/components/ui/button';
import { signInWithGoogle, signInWithKeycloak } from '@/app/(auth)/actions';
import { LogoKeycloak, LogoGoogle } from '../icons';
import { useActionState, useState, useEffect } from 'react';
import { LoaderIcon } from 'lucide-react';
import { getProviders } from 'next-auth/react';
import { Skeleton } from '../ui/skeleton';

function SocialProvidersSkeleton() {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Skeleton className="h-11 w-full border border-border" />
      <Skeleton className="h-11 w-full border border-border" />
    </div>
  )
}

export const Social = () => {  
  const [providers, setProviders] = useState<Awaited<ReturnType<typeof getProviders>> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProviders() {
      const res = await getProviders();
      setIsLoading(false);
      setProviders(res)
    }
    fetchProviders()
  }, [])
 
  if (isLoading) return <SocialProvidersSkeleton />
 
  return (
    <form className="flex w-full flex-col items-center gap-2">
      {providers?.google && (
        <GoogleButton />
      )}
      {providers?.keycloak && (
        <KeycloakButton />
      )}
      {(!providers?.keycloak && !providers?.google) && (
        <div className="text-destructive dark:text-red-500 text-sm">
          No providers available
        </div>
      )}
    </form>
  );
};

const KeycloakButton = ({ disabled }: { disabled?: boolean }) => {
  const [error, submitAction, isPending] = useActionState(async () => {
    const error = await signInWithKeycloak();
    if (error) {
      return error;
    }
    return null;
  }, null);

  return (
    <Button
      size="lg"
      className="flex w-full flex-row items-center justify-center gap-2 shadow-sm"
      variant="outline"
      disabled={isPending || disabled}
      formAction={submitAction}
    >
      {isPending ? (
        <LoaderIcon className="size-4 animate-spin" />
      ) : (
        <LogoKeycloak />
      )}

      <span className="font-medium text-muted-foreground">
        Continue with Keycloak
      </span>
    </Button>
  );
};

export const GoogleButton = ({ disabled }: { disabled?: boolean }) => {
  const [error, submitAction, isPending] = useActionState(async () => {
    const error = await signInWithGoogle();
    if (error) {
      return error;
    }
    return null;
  }, null);

  return (
    <Button
      size="lg"
      className="flex w-full flex-row items-center justify-center gap-2 shadow-sm"
      variant="outline"
      disabled={isPending || disabled}
      formAction={submitAction}
    >
      {isPending ? (
        <LoaderIcon className="size-4 animate-spin" />
      ) : (
        <LogoGoogle size={20} />
      )}

      <span className="font-medium text-muted-foreground">
        Continue with Google
      </span>
    </Button>
  );
};
