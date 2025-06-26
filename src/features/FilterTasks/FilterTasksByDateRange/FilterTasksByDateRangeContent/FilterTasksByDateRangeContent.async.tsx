import dynamic from 'next/dynamic';

import { FilterTasksByDateRangeContentLoading } from './FilterTasksByDateRangeContent.loading';

export const LazyFilterTasksByDateRangeContent = dynamic(
  () =>
    import('./FilterTasksByDateRangeContent').then(
      mod => mod.FilterTasksByDateRangeContent,
    ),
  { ssr: false, loading: () => <FilterTasksByDateRangeContentLoading /> },
);
