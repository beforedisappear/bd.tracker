import dynamic from 'next/dynamic';

export const LazyReceiveNews = dynamic(() =>
  import('./ReceiveNews').then(mod => ({ default: mod.ReceiveNews })),
);
