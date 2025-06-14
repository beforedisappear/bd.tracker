'use client';

import dynamic from 'next/dynamic';

export const LazyDeleteColumnMobile = dynamic(
  () => import('./DeleteColumn.mobile').then(mod => mod.DeleteColumnMobile),
  { ssr: false },
);
