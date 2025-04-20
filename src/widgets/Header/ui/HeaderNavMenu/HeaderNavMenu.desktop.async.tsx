'use client';

import dynamic from 'next/dynamic';

export const LazyHeaderNavMenuDesktop = dynamic(
  () =>
    import('./HeaderNavMenu.desktop').then(mod => ({
      default: mod.HeaderNavMenuDesktop,
    })),
  { ssr: false },
);
