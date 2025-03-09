'use client';

import dynamic from 'next/dynamic';

export const LazyMobileAuthModal = dynamic(
  () =>
    import('./AuthModal.mobile').then(mod => ({
      default: mod.MobileAuthModal,
    })),
  { ssr: false },
);
