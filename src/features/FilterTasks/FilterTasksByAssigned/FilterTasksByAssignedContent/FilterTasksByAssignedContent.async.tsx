import dynamic from 'next/dynamic';

import { FilterTasksByAssignedContentLoading } from './FilterTasksByAssignedContent.loading';

export const LazyFilterTasksByAssignedContent = dynamic(
  () =>
    import('./FilterTasksByAssignedContent').then(
      mod => mod.FilterTasksByAssignedContent,
    ),
  { ssr: false, loading: () => <FilterTasksByAssignedContentLoading /> },
);
