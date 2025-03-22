'use client';

import dynamic from 'next/dynamic';

export const LazyDesktopHeaderNavMenu = dynamic(
  () =>
    import('./HeaderNavMenu.desktop').then(mod => ({
      default: mod.DesktopHeaderNavMenu,
    })),
  { ssr: false },
);
