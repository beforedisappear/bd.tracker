'use client';

import { LazyDesktopAuthModal } from './AuthModal.desktop.async';
import { LazyMobileAuthModal } from './AuthModal.mobile.async';

import { isMobile } from 'react-device-detect';

//only mobile component
export function AuthModal() {
  return isMobile ? <LazyMobileAuthModal /> : <LazyDesktopAuthModal />;
}
