import { Sidebar } from '@/shared/ui/Sidebar/Sidebar';
import { SidebarProvider } from '@/shared/ui/Sidebar/Sidebar.state';
import { SidebarTrigger } from '@/shared/ui/Sidebar/SidebarTrigger';
import type { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export async function PrivateRootLayout({ children }: IProps) {
  return (
    <SidebarProvider>
      <Sidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
