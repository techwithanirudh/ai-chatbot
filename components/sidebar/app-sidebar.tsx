'use client';

import type { User } from 'next-auth';
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
import { SidebarToggle } from './sidebar-toggle';

export function AppSidebar({
  user,
  ...props
}: { user: User | undefined } & React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const { setOpenMobile, open } = useSidebar();

  return (
    <Sidebar className="group-data-[side=left]:border-r-0" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-col justify-between items-center gap-2 relative">
            <Link
              href="/"
              onClick={() => {
                setOpenMobile(false);
              }}
              className="flex shrink-0 items-center justify-center text-lg text-muted-foreground transition-opacity delay-75 duration-75 font-semibold"
            >
              Chatbot
            </Link>
            <Button
              variant="default"
              type="button"
              size={'sm'}
              className="gap-1.5 w-full border border-border font-semibold group/button"
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
      <SidebarContent>
        <SidebarHistory user={user} />
      </SidebarContent>
      <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
