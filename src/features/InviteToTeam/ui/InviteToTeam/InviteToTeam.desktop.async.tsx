import dynamic from 'next/dynamic';
import { InviteToTeamTrigger } from '../InviteToTeamTrigger/InviteToTeamTrigger';

export const LazyInviteToTeamDesktop = dynamic(
  () => import('./InviteToTeam.desktop').then(mod => mod.InviteToTeamDesktop),
  { ssr: false, loading: () => <InviteToTeamTrigger /> },
);
