import { MainSidebar } from '@/widgets/MainSidebar';
import { SidebarProvider } from '@/shared/ui/c';

import type { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export async function PrivateRootLayout({ children }: IProps) {
  return (
    <>
      <SidebarProvider>
        <MainSidebar />
        <main>{children}</main>
      </SidebarProvider>
    </>
  );
}
