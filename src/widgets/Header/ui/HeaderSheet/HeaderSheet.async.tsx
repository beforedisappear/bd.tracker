'use client';

import dynamic from 'next/dynamic';

export const LazyHeaderSheet = dynamic(
  () =>
    import('./HeaderSheet').then(mod => ({
      default: mod.HeaderSheet,
    })),
  { ssr: false },
);
