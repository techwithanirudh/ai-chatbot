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
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { PlusIcon } from 'lucide-react';

export function AppSidebar({
  user,
  ...props
}: { user: User | undefined } & React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="group-data-[side=left]:border-r-0" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-col justify-between items-center gap-2">
            <Link
              href="/"
              onClick={() => {
                setOpenMobile(false);
              }}
              className="flex flex-row gap-3 items-center"
            >
              <span className="text-lg font-semibold cursor-pointer text-primary group/logo">
                Chatbot
              </span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
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
              </TooltipTrigger>
              <TooltipContent align="end">New Chat</TooltipContent>
            </Tooltip>
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
