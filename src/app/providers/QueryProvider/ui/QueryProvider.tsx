'use client';

import { queryClient } from '@/shared/config/query/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useState, type PropsWithChildren } from 'react';

export function QueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(() => queryClient);

  return (
    <QueryClientProvider client={client}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
