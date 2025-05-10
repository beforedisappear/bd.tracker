'use client';

import { LazyDeleteTeamDesktop } from './DeleteTeam.desktop.async';
import { LazyDeleteTeamMobile } from './DeleteTeam.mobile.async';

import { useDeviceType } from '@/shared/lib/deviceType/c';

interface Props {
  hideTrigger?: boolean;
}

export function DeleteTeam(props: Props) {
  const { hideTrigger } = props;

  const { isMobile, isDesktop } = useDeviceType();

  return (
    <>
      {isMobile && <LazyDeleteTeamMobile hideTrigger={hideTrigger} />}
      {isDesktop && <LazyDeleteTeamDesktop hideTrigger={hideTrigger} />}
    </>
  );
}
