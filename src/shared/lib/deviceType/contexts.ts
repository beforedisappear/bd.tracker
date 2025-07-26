'use client';

import { createContext } from 'react';

import type { DeviceType, DeviceContext } from './types';

const initialContextValue = {
  deviceType: 'mobile' as DeviceType,
  isMobile: true,
  isDesktop: false,
};

export const DeviceTypeContext =
  createContext<DeviceContext>(initialContextValue);
