'use client';

import { LazyDeleteBoardDesktop } from './DeleteBoard.desktop.async';
import { LazyDeleteBoardMobile } from './DeleteBoard.mobile.async';

import { useDeviceType } from '@/shared/lib/deviceType/c';

export function DeleteBoard() {
  const { isMobile, isDesktop } = useDeviceType();

  return (
    <>
      {isMobile && <LazyDeleteBoardMobile />}
      {isDesktop && <LazyDeleteBoardDesktop />}
    </>
  );
}
