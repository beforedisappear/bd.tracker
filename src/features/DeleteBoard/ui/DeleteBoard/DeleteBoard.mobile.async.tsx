'use client';

import dynamic from 'next/dynamic';

export const LazyDeleteBoardMobile = dynamic(
  () => import('./DeleteBoard.mobile').then(mod => mod.DeleteBoardMobile),
  { ssr: false },
);
