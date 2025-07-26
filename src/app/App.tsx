import './styles/globals.css';

import type { PropsWithChildren } from 'react';

//entrypoint (layout.tsx)
export function App({ children }: PropsWithChildren) {
  return (
    <html lang='ru' translate='no' suppressHydrationWarning>
      {children}
    </html>
  );
}
