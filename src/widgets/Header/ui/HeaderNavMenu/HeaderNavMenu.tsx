'use client';

import { LazyDesktopHeaderNavMenu } from './HeaderNavMenu.desktop.async';
import { LazyMobileHeaderNavMenu } from './HeaderNavMenu.mobile.async';

import { isDesktop, isMobile } from 'react-device-detect';

interface Props {
  offMobile?: boolean;
  onSetShowSheet?: (state: boolean) => void;
}

export function HeaderNavMenu({ offMobile, onSetShowSheet }: Props) {
  return (
    <>
      {isDesktop && <LazyDesktopHeaderNavMenu />}
      {isMobile && !offMobile && (
        <LazyMobileHeaderNavMenu onSetShowSheet={onSetShowSheet} />
      )}
    </>
  );
}
