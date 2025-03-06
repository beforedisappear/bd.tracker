'use client';

import dynamic from 'next/dynamic';

export const LazyMobileHeaderSheet = dynamic(
  () =>
    import('./HeaderSheet.mobile').then(mod => ({
      default: mod.MobileHeaderSheet,
    })),
  { ssr: false },
);
