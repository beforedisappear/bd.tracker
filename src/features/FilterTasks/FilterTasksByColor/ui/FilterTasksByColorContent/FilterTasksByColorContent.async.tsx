import dynamic from 'next/dynamic';

import { FilterTasksByColorContentLoading } from './FilterTasksByColorContent.loading';

export const LazyFilterTasksByColorContent = dynamic(
  () =>
    import('./FilterTasksByColorContent').then(
      mod => mod.FilterTasksByColorContent,
    ),
  { ssr: false, loading: () => <FilterTasksByColorContentLoading /> },
);
