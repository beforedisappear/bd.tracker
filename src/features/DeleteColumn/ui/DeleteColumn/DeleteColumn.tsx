'use client';

import { LazyDeleteColumnDesktop } from './DeleteColumn.desktop.async';
import { LazyDeleteColumnMobile } from './DeleteColumn.mobile.async';

import { useDeviceType } from '@/shared/lib/deviceType/c';

export function DeleteColumn() {
  const { isMobile, isDesktop } = useDeviceType();

  return (
    <>
      {isMobile && <LazyDeleteColumnMobile />}
      {isDesktop && <LazyDeleteColumnDesktop />}
    </>
  );
}
