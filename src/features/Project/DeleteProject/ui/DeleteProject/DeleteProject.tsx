'use client';

import { LazyDeleteProjectDesktop } from './DeleteProject.desktop.async';
import { LazyDeleteProjectMobile } from './DeleteProject.mobile.async';

import { useDeviceType } from '@/shared/lib/deviceType/c';

export function DeleteProject() {
  const { isDesktop, isMobile } = useDeviceType();

  return (
    <>
      {isDesktop && <LazyDeleteProjectDesktop />}
      {isMobile && <LazyDeleteProjectMobile />}
    </>
  );
}
