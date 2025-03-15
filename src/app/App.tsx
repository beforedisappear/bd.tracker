import './styles/globals.css';

import { geistMono } from './fonts/geistMono';
import { geistSans } from './fonts/geistSans';

import { ThemeProvider } from './providers/ThemeProvider';
import { StoreProvider } from './providers/StoreProvider';
import { QueryProvider } from './providers/QueryProvider';
import { ToastProvider } from './providers/ToastProvider';

import type { PropsWithChildren } from 'react';

//entrypoint (layout.tsx)
export function App({ children }: PropsWithChildren) {
  return (
    <html lang='ru' translate='no' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <ThemeProvider>
            <QueryProvider>
              <ToastProvider>{children}</ToastProvider>
            </QueryProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
