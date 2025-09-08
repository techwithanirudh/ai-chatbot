'use client';

import type { User } from '@clerk/nextjs/server';
import { useRouter } from 'next/navigation';

import { SidebarHistory } from '@/components/sidebar/sidebar-history';
import { SidebarUserNav } from '@/components/sidebar/sidebar-user-nav';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

export function AppSidebar({
  user,
  ...props
}: { user: User | null } & React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const { setOpenMobile, open } = useSidebar();

  return (
    <Sidebar className="group-data-[side=left]:border-r-0" {...props}>
      <SidebarHeader className="px-2 py-1">
        <SidebarMenu>
          <div className="flex flex-col justify-between items-center gap-2 relative">
            <div className="flex w-full shrink-0 justify-center items-center transition-opacity delay-75 duration-75 font-semibold h-8">
              <Link
                href="/"
                onClick={() => {
                  setOpenMobile(false);
                }}
                className="text-lg text-muted-foreground"
              >
                Chatbot
              </Link>
            </div>
            <Button
              variant="default"
              type="button"
              size={'lg'}
              className="gap-1.5 w-full border border-border font-semibold group/button rounded-lg"
              onClick={() => {
                setOpenMobile(false);
                router.push('/');
                router.refresh();
              }}
            >
              <PlusIcon
                className="size-4 group-hover/button:rotate-90 transition-transform duration-300"
                strokeWidth={2.5}
              />{' '}
              New Chat
            </Button>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="scroll-shadow">
        <SidebarHistory user={user} />
      </SidebarContent>
      <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
