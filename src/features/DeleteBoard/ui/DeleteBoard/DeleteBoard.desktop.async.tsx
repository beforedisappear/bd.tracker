'use client';

import dynamic from 'next/dynamic';

export const LazyDeleteBoardDesktop = dynamic(
  () => import('./DeleteBoard.desktop').then(mod => mod.DeleteBoardDesktop),
  { ssr: false },
);
