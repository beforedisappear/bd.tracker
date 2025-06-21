'use client';

import { useDeviceType } from '@/shared/lib/deviceType/c';

import { LazyCreateBoardDesktop } from './CreateBoard.desktop.async';
import { LazyCreateBoardMobile } from './CreateBoard.mobile.async';

export function CreateBoard() {
  const { isMobile, isDesktop } = useDeviceType();

  return (
    <>
      {isMobile && <LazyCreateBoardMobile />}
      {isDesktop && <LazyCreateBoardDesktop />}
    </>
  );
}
