'use client';

import { LazyDesktopAuthModal } from './AuthModal.desktop.async';
import { LazyMobileAuthModal } from './AuthModal.mobile.async';

import { isMobile } from 'react-device-detect';

import type { ReactNode } from 'react';

interface IProps {
  trigger?: ReactNode;
}

//only mobile component
export function AuthModal(props: IProps) {
  return isMobile ? (
    <LazyMobileAuthModal {...props} />
  ) : (
    <LazyDesktopAuthModal {...props} />
  );
}
