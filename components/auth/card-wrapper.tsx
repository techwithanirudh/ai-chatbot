import { cn } from '@/lib/utils';

import { BackButton } from '@/components/auth/back-button';
import { Social } from '@/components/auth/social';

interface CardWrapperProps {
  children: React.ReactNode;
  backButtonLabel: string;
  backButtonLinkLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  showCredentials?: boolean;
  className?: string;
}

export const CardWrapper = ({
  children,
  backButtonLabel,
  backButtonLinkLabel,
  backButtonHref,
  showSocial,
  showCredentials,
  className,
}: CardWrapperProps) => {
  return (
    <div className={cn('grid gap-6', className)}>
      {showCredentials && (
        <>
          <div>{children}</div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
        </>
      )}

      {showSocial && <Social />}

      <BackButton
        label={backButtonLabel}
        linkLabel={backButtonLinkLabel}
        href={backButtonHref}
      />
    </div>
  );
};
