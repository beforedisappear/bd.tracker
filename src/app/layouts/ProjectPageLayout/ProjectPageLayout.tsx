'use client';

import { useScrollLock } from '@/shared/lib/ui';

import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function ProjectPageLayout({ children }: Props) {
  useScrollLock({ enabled: true, type: 'x' });

  return <>{children}</>;
}
