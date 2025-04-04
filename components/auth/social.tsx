'use client';
import { Button } from '@/components/ui/button';
import { signInWithGoogle, signInWithKeycloak } from '@/app/(auth)/actions';
import { LogoKeycloak, LogoGoogle } from '../icons';
import { useActionState } from 'react';
import { LoaderIcon } from 'lucide-react';

export const Social = () => {
  return (
    <form className="flex w-full flex-col items-center gap-2">
      <GoogleButton />
      <KeycloakButton />
    </form>
  );
};

const KeycloakButton = () => {
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
      disabled={isPending}
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

export const GoogleButton = () => {
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
      disabled={isPending}
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
