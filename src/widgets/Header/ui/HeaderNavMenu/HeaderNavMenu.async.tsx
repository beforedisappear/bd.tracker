'use client';

import dynamic from 'next/dynamic';

export const LazyHeaderNavMenu = dynamic(
  () =>
    import('./HeaderNavMenu').then(mod => ({
      default: mod.HeaderNavMenu,
    })),
  { ssr: false },
);
