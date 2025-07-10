import { SetupProjectDesktop } from './SetupProject.desktop';
import { SetupProjectMobile } from './SetupProject.mobile';

import { useDeviceType } from '@/shared/lib/deviceType/c';

import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export function SetupProject({ children }: Props) {
  const { isDesktop, isMobile } = useDeviceType();

  return (
    <>
      {isDesktop && <SetupProjectDesktop>{children}</SetupProjectDesktop>}
      {isMobile && <SetupProjectMobile />}
    </>
  );
}
