import dynamic from 'next/dynamic';
import { ManageProjectMembersContentLoading } from './ManageProjectMembersContent.loading';

export const LazyManageProjectMembersContent = dynamic(
  () =>
    import('./ManageProjectMembersContent').then(
      mod => mod.ManageProjectMembersContent,
    ),
  { ssr: false, loading: () => <ManageProjectMembersContentLoading /> },
);
