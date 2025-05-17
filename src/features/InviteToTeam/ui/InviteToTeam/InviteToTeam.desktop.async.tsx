import dynamic from 'next/dynamic';
import { InviteToTeamContentLoading } from '../InviteToTeamContent/InviteToTeamContent.loading';

export const LazyInviteToTeamDesktop = dynamic(
  () => import('./InviteToTeam.desktop').then(mod => mod.InviteToTeamDesktop),
  { ssr: false, loading: () => <InviteToTeamContentLoading /> },
);
