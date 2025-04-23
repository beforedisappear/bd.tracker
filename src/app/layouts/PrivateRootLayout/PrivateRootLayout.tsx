import { MainSidebar } from '@/widgets/MainSidebar';
import { PrivateHeader } from '@/widgets/PrivateHeader';
import { SidebarProvider } from '@/shared/ui/c';

import type { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export async function PrivateRootLayout({ children }: IProps) {
  return (
    <>
      <SidebarProvider>
        <MainSidebar />

        <div className='flex flex-col flex-grow'>
          <PrivateHeader />
          <main
            className='flex flex-col flex-grow max-w-[1400px] px-8 py-6
            md:p-4'
          >
            {children}
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
