import { Header } from '@/widgets/Header';

import type { PropsWithChildren } from 'react';

export function PublicRootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <div id='wrapper' className='container flex flex-col flex-grow p-0'>
        <main>{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
}
