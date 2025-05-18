import dynamic from 'next/dynamic';

import { InviteToTeamTrigger } from '../InviteToTeamTrigger/InviteToTeamTrigger';

import { INVITE_TO_TEAM_BTN_TEXT } from '../../config';

export const LazyInviteToTeamMobile = dynamic(
  () => import('./InviteToTeam.mobile').then(mod => mod.InviteToTeamMobile),
  {
    ssr: false,
    loading: () => <InviteToTeamTrigger text={INVITE_TO_TEAM_BTN_TEXT} />,
  },
);
