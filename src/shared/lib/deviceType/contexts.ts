'use client';

import { createContext } from 'react';

export type DeviceType = 'mobile' | 'desktop';

export type DeviceContext = {
  deviceType: DeviceType;
  isMobile: boolean;
  isDesktop: boolean;
};

const initialContextValue = {
  deviceType: 'mobile' as DeviceType,
  isMobile: true,
  isDesktop: false,
};

export const DeviceTypeContext =
  createContext<DeviceContext>(initialContextValue);
