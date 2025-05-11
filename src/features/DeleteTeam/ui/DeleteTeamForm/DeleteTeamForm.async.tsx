import dynamic from 'next/dynamic';

import { DeleteTeamFormLoading } from './DeleteTeamForm.loading';

export const LazyDeleteTeamForm = dynamic(
  () => import('./DeleteTeamForm').then(mod => mod.DeleteTeamForm),
  { ssr: false, loading: () => <DeleteTeamFormLoading /> },
);
