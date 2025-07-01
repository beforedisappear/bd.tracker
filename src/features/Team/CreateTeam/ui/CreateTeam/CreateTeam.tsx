'use client';

import { useDeviceType } from '@/shared/lib/deviceType/c';

import { LazyCreateTeamDesktop } from './CreateTeam.desktop.async';
import { LazyCreateTeamMobile } from './CreateTeam.mobile.async';

export function CreateTeam() {
  const { isMobile, isDesktop } = useDeviceType();

  return (
    <>
      {isMobile && <LazyCreateTeamMobile />}
      {isDesktop && <LazyCreateTeamDesktop />}
    </>
  );
}
