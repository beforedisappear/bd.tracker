'use client';

import dynamic from 'next/dynamic';

export const LazyDeleteColumnDesktop = dynamic(
  () => import('./DeleteColumn.desktop').then(mod => mod.DeleteColumnDesktop),
  { ssr: false },
);
