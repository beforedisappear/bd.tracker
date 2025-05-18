import dynamic from 'next/dynamic';
import { DeleteTeamMemberTrigger } from '../DeleteTeamMemberTrigger/DeleteTeamMemberTrigger';

export const LazyDeleteTeamMember = dynamic(
  () => import('./DeleteTeamMember').then(mod => mod.DeleteTeamMember),
  { ssr: false, loading: () => <DeleteTeamMemberTrigger /> },
);
