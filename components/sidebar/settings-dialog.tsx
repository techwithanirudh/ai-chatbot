'use client';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { signOut } from 'next-auth/react';
import type React from 'react';
import type { User } from 'next-auth';
import Image from 'next/image';

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from '@/components/ui/credenza';

const themes = [
  { id: 'system', name: 'System', colors: ['#ffffff', '#1a1a1a'] },
  { id: 'light', name: 'Light', colors: ['#ffffff'] },
  { id: 'dark', name: 'Dark', colors: ['#1a1a1a'] },
];

type SettingsContentProps = {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Theme = 'light' | 'dark' | 'system';

export function SettingsDialog({
  user,
  open,
  onOpenChange,
}: SettingsContentProps) {
  const { theme: currentTheme, resolvedTheme, setTheme } = useTheme();
  const isDrawer = false;

  const handleChangeTheme = async (theme: Theme) => {
    function update() {
      setTheme(theme);
    }

    if (document.startViewTransition && theme !== resolvedTheme) {
      document.documentElement.style.viewTransitionName = 'theme-transition';
      await document.startViewTransition(update).finished;
      document.documentElement.style.viewTransitionName = '';
    } else {
      update();
    }
  };

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
              <div
                className={`grid ${isDrawer ? 'grid-cols-2' : 'grid-cols-3'} gap-3`}
              >
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => {
                      handleChangeTheme(theme.id as Theme);
                    }}
                    className={`rounded-lg border p-3 ${
                      currentTheme === theme.id
                        ? 'border-primary ring-primary/30 ring-2'
                        : 'border-border'
                    }`}
                  >
                    <div className="mb-2 flex space-x-1">
                      {theme.colors.map((color, i) => (
                        <div
                          key={color}
                          className="border-border h-4 w-4 rounded-full border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <p className="text-left text-sm font-medium">
                      {theme.name}
                    </p>
                  </button>
                ))}
              </div>
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
