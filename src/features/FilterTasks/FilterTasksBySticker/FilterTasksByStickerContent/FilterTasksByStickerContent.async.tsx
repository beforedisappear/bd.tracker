import dynamic from 'next/dynamic';

import { FilterTasksByStickerContentLoading } from './FilterTasksByStickerContent.loading';

export const LazyFilterTasksByStickerContent = dynamic(
  () =>
    import('./FilterTasksByStickerContent').then(
      mod => mod.FilterTasksByStickerContent,
    ),
  { ssr: false, loading: () => <FilterTasksByStickerContentLoading /> },
);
