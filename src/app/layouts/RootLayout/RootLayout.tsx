// import { Header } from '@/widgets/Header';

import type { PropsWithChildren } from 'react';

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <div id='wrapper'>
      {/* <Header /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
