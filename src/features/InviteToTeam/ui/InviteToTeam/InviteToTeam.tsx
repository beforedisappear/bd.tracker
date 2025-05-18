'use client';

import { useDeviceType } from '@/shared/lib/deviceType/c';

import { LazyInviteToTeamDesktop } from './InviteToTeam.desktop.async';
import { LazyInviteToTeamMobile } from './InviteToTeam.mobile.async';

import { INVITE_TO_TEAM_BTN_TEXT } from '../../config';

export function InviteToTeam() {
  const { isMobile, isDesktop } = useDeviceType();

  return (
    <>
      {isMobile && <LazyInviteToTeamMobile btnText={INVITE_TO_TEAM_BTN_TEXT} />}
      {isDesktop && (
        <LazyInviteToTeamDesktop btnText={INVITE_TO_TEAM_BTN_TEXT} />
      )}
    </>
  );
}
