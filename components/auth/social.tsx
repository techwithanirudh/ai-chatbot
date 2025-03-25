'use client';
import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '@/app/(auth)/actions';
import { LogoGoogle } from '../icons';
import { useActionState } from 'react';
import { LoaderIcon } from 'lucide-react';

export const Social = () => {
  const [error, submitAction, isPending] = useActionState(async () => {
    const error = await signInWithGoogle();
    if (error) {
      return error;
    }
    return null;
  }, null);

  return (
    <form className="flex w-full flex-col items-center gap-2">
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
    </form>
  );
};
