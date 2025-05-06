'use client';
import { memo } from 'react';

import { useSidebar } from '@/components/ui/sidebar';
import { SidebarToggle } from '@/components/sidebar/sidebar-toggle';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { PlusIcon } from '../icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useRouter } from 'next/navigation';

function PureSidebarIsland({
  chatId,
  isReadonly,
}: {
  chatId: string;
  isReadonly: boolean;
}) {
  const { open } = useSidebar();
  const router = useRouter();

  return (
    <div className="pointer-events-auto fixed left-2 z-50 flex flex-row gap-0.5 p-1 top-2">
      <div
        className={cn(
          'duration-250 pointer-events-none absolute inset-0 right-auto -z-10 w-10 rounded-md bg-transparent backdrop-blur-xs transition-[background-color,width] delay-0 max-md:delay-125 max-md:duration-125 max-md:w-full max-md:bg-sidebar/50',
          {
            'duration-125 delay-125 w-full bg-sidebar/50 blur-fallback:bg-sidebar':
              !open,
          },
        )}
      />
      <SidebarToggle />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className={cn('h-fit px-2', {
              'sm:pointer-events-none sm:-translate-x-[2.125rem] sm:opacity-0 sm:delay-0 sm:duration-150':
                open,
            })}
            onClick={() => {
              router.push('/');
              router.refresh();
            }}
          >
            <PlusIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>New Chat</TooltipContent>
      </Tooltip>
    </div>
  );
}

export const SidebarIsland = memo(PureSidebarIsland, () => true);
