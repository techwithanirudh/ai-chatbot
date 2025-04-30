'use client';
import type { ComponentProps } from 'react';

import { type SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { SidebarToggle } from './sidebar-toggle';
import { cn } from '@/lib/utils';

export function SidebarControls({
  className,
}: ComponentProps<typeof SidebarTrigger>) {
  const { open } = useSidebar();

  return (
    <div className="pointer-events-auto fixed left-3 z-50 flex flex-row gap-0.5 p-1 md:top-2.5 top-0.5">
      <SidebarToggle className={cn(!open ? 'border-input border transition-colors duration-250' : '')}/>
    </div>
  );
}
