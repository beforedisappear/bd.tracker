'use client';

import dynamic from 'next/dynamic';

export const LazyHeaderNavMenuMobile = dynamic(
  () =>
    import('./HeaderNavMenu.mobile').then(mod => ({
      default: mod.HeaderNavMenuMobile,
    })),
  { ssr: false },
);
