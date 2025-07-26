import { Toaster } from '@/shared/ui/c';

import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export function ToastProvider({ children }: Props) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
