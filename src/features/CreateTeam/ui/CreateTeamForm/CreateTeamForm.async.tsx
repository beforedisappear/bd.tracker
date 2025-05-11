import dynamic from 'next/dynamic';
import { CreateTeamFormLoading } from './CreateTeamForm.loading';

export const LazyCreateTeamForm = dynamic(
  () => import('./CreateTeamForm').then(mod => mod.CreateTeamForm),
  { ssr: false, loading: () => <CreateTeamFormLoading /> },
);
