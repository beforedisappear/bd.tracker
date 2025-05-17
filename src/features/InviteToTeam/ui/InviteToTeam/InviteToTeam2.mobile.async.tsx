import dynamic from 'next/dynamic';

import { InviteToTeamTrigger } from '../InviteToTeamTrigger/InviteToTeamTrigger';

import { INVITE_TO_TEAM_BTN_TEXT_2 } from '../../config';

export const LazyInviteToTeam2Mobile = dynamic(
  () => import('./InviteToTeam.mobile').then(mod => mod.InviteToTeamMobile),
  {
    ssr: false,
    loading: () => (
      <InviteToTeamTrigger text={INVITE_TO_TEAM_BTN_TEXT_2} variant={null} />
    ),
  },
);
