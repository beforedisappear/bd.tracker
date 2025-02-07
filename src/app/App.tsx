import './styles/globals.css';

import { geistMono } from './fonts/geistMono';
import { geistSans } from './fonts/geistSans';

import { RootLayout } from './layouts/RootLayout/RootLayout';

import { ThemeProvider } from './providers/ThemeProvider';
import { StoreProvider } from './providers/StoreProvider';
import { QueryProvider } from './providers/QueryProvider';

import type { PropsWithChildren } from 'react';

//entrypoint (layout.tsx)
export function App({ children }: PropsWithChildren) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <ThemeProvider>
            <QueryProvider>
              <RootLayout>{children}</RootLayout>
            </QueryProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
