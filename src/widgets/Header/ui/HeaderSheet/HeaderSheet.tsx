'use client';

import { LazyMobileHeaderSheet } from './HeaderSheet.mobile.async';

import { isMobile } from 'react-device-detect';

//only mobile component
export function HeaderSheet() {
  return isMobile ? <LazyMobileHeaderSheet /> : <></>;
}
