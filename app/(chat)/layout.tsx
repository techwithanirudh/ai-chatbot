import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarControls } from '@/components/sidebar/sidebar-controls';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '../../server/auth';
import Script from 'next/script';

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <SidebarProvider defaultOpen={!isCollapsed}>
        <AppSidebar variant="inset" user={session?.user} />
        <SidebarControls />
        <SidebarInset className="md:peer-data-[variant=inset]:shadow-none transition-transition-[width,height] md:peer-data-[variant=inset]:rounded-b-none md:peer-data-[variant=inset]:m-0 overflow-hidden">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
