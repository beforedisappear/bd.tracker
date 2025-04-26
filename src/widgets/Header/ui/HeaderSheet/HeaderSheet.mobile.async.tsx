'use client';

import dynamic from 'next/dynamic';

export const LazyHeaderSheetMobile = dynamic(
  () =>
    import('./HeaderSheet.mobile').then(mod => ({
      default: mod.HeaderSheetMobile,
    })),
  { ssr: false },
);
