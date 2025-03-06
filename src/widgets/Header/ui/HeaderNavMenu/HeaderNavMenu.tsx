'use client';

import { LazyDesktopHeaderNavMenu } from './HeaderNavMenu.desktop.async';
import { LazyMobileHeaderNavMenu } from './HeaderNavMenu.mobile.async';

import { isDesktop, isMobile } from 'react-device-detect';

interface Props {
  offMobile?: boolean;
}

export function HeaderNavMenu({ offMobile }: Props) {
  return (
    <>
      {isDesktop && <LazyDesktopHeaderNavMenu />}
      {isMobile && !offMobile && <LazyMobileHeaderNavMenu />}
    </>
  );
}
