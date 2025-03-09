'use client';

import dynamic from 'next/dynamic';

export const LazyDesktopAuthModal = dynamic(
  () =>
    import('./AuthModal.desktop').then(mod => ({
      default: mod.DesktopAuthModal,
    })),
  { ssr: false },
);
