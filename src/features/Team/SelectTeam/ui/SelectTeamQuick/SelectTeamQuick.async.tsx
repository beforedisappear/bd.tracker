'use client';

import dynamic from 'next/dynamic';

export const LazySelectTeamQuick = dynamic(
  () =>
    import('./SelectTeamQuick').then(mod => ({ default: mod.SelectTeamQuick })),
  { ssr: false },
);
