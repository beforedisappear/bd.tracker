import dynamic from 'next/dynamic';

import { InviteToTeamContentLoading } from './InviteToTeamContent.loading';

export const LazyInviteToTeamContent = dynamic(
  () => import('./InviteToTeamContent').then(mod => mod.InviteToTeamContent),
  { ssr: false, loading: () => <InviteToTeamContentLoading /> },
);
