import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

import type { PropsWithChildren } from 'react';

export function PublicRootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className='container flex flex-col flex-grow px-0'>{children}</main>
      <Footer />
    </>
  );
}
