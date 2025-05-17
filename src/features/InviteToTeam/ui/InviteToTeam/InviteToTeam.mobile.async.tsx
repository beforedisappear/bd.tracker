import dynamic from 'next/dynamic';
import { InviteToTeamTrigger } from '../InviteToTeamTrigger/InviteToTeamTrigger';

export const LazyInviteToTeamMobile = dynamic(
  () => import('./InviteToTeam.mobile').then(mod => mod.InviteToTeamMobile),
  { ssr: false, loading: () => <InviteToTeamTrigger /> },
);
