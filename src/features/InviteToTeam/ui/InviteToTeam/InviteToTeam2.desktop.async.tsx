import dynamic from 'next/dynamic';

import { InviteToTeamTrigger } from '../InviteToTeamTrigger/InviteToTeamTrigger';

import { INVITE_TO_TEAM_BTN_TEXT_2 } from '../../constants';

export const LazyInviteToTeam2Desktop = dynamic(
  () => import('./InviteToTeam.desktop').then(mod => mod.InviteToTeamDesktop),
  {
    ssr: false,
    loading: () => (
      <InviteToTeamTrigger text={INVITE_TO_TEAM_BTN_TEXT_2} variant={null} />
    ),
  },
);
