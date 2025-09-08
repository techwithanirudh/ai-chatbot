'use client';
import { ChevronUp } from 'lucide-react';
import Image from 'next/image';
import type { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SettingsDialog } from './settings-dialog';
import { useState } from 'react';

export function SidebarUserNav({ user }: { user: User }) {
  const { setTheme, theme } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent bg-sidebar data-[state=open]:text-sidebar-accent-foreground h-12 -mx-1 py-3">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name ?? 'User Avatar'}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src={`https://avatar.vercel.sh/${user.email}`}
                    alt={user.name ?? 'User Avatar'}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="truncate">{user?.name ?? user.email}</span>

                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-(--radix-popper-anchor-width)"
            >
              {/* <DropdownMenuItem
                className="inline-flex justify-between w-full hover:bg-background! py-1"
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <p>Theme</p>
                <ThemeToggle mode="light-dark-system" />
              </DropdownMenuItem> */}
              <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button
                  type="button"
                  className="w-full cursor-pointer"
                  onClick={() => {
                    signOut({
                      redirectTo: '/',
                    });
                  }}
                >
                  Sign out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        user={user}
      />
    </>
  );
}
