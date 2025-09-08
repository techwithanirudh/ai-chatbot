'use client';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { signOut } from 'next-auth/react';
import type React from 'react';
import type { User } from '@clerk/nextjs/server';
import Image from 'next/image';

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from '@/components/ui/credenza';
import { ThemeToggle } from '../theme-toggle';

type SettingsContentProps = {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SettingsDialog({
  user,
  open,
  onOpenChange,
}: SettingsContentProps) {
  if (!user) return null;

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent>
        <CredenzaHeader className="md:py-2">
          <CredenzaTitle>Settings</CredenzaTitle>
          <CredenzaDescription>
            Adjust your account settings and preferences.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="divide-y divide-border [&>div]:p-6 -mx-6 border-t border-border">
            <div className="flex items-center space-x-4">
              <div className="bg-muted flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-border">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name ?? 'User Avatar'}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src={`https://avatar.vercel.sh/${user.email}`}
                    alt={user.name ?? 'User Avatar'}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium">{user?.name}</h3>
                <p className="text-muted-foreground text-sm">{user?.email}</p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium">Theme</h3>
              <ThemeToggle />
            </div>

            <div className="flex items-center justify-between md:pb-2!">
              <div>
                <h3 className="text-sm font-medium">Account</h3>
                <p className="text-muted-foreground text-xs">
                  Log out on this device
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  signOut({
                    redirectTo: '/',
                  });
                }}
              >
                Sign out
              </Button>
            </div>
          </div>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
