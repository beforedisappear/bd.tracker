'use client';

import dynamic from 'next/dynamic';

export const LazyMobileHeaderNavMenu = dynamic(
  () =>
    import('./HeaderNavMenu.mobile').then(mod => ({
      default: mod.MobileHeaderNavMenu,
    })),
  { ssr: false },
);
