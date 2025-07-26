import { ThemeProvider } from '../ThemeProvider';
import { QueryProvider } from '../QueryProvider';
import { ToastProvider } from '../ToastProvider';

import NextTopLoader from 'nextjs-toploader';

import type { PropsWithChildren } from 'react';

export function RootProvider({ children }: PropsWithChildren) {
  return (
    <>
      <NextTopLoader color='hsl(var(--primary))' showSpinner={false} />

      <ThemeProvider>
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
      </ThemeProvider>
    </>
  );
}
