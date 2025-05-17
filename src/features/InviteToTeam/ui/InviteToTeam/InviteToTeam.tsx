'use client';

import { useDeviceType } from '@/shared/lib/deviceType/c';

import { LazyInviteToTeamDesktop } from './InviteToTeam.desktop.async';
import { LazyInviteToTeamMobile } from './InviteToTeam.mobile.async';

export function InviteToTeam() {
  const { isMobile, isDesktop } = useDeviceType();

  return (
    <>
      {isMobile && <LazyInviteToTeamMobile />}
      {isDesktop && <LazyInviteToTeamDesktop />}
    </>
  );
}
