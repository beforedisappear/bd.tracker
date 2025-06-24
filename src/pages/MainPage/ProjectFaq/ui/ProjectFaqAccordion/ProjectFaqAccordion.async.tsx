'use client';

import dynamic from 'next/dynamic';

export const LazyProjectFaqAccordion = dynamic(
  () =>
    import('./ProjectFaqAccordion').then(mod => ({
      default: mod.ProjectFaqAccordion,
    })),
  { ssr: false },
);
