import { geistSans } from '../../fonts/geistSans';
import { geistMono } from '../../fonts/geistMono';

import { DeviceTypeProvider } from '../../providers/DeviceTypeProvider';
import { RootProvider } from '../../providers/RootProvider';

import { MOBILE_DEVICE_TYPE } from '@/shared/lib/deviceType/s';

import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export function MobileLayout({ children }: Props) {
  return (
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased ${MOBILE_DEVICE_TYPE}`}
    >
      <DeviceTypeProvider
        value={{
          deviceType: MOBILE_DEVICE_TYPE,
          isMobile: true,
          isDesktop: false,
        }}
      >
        <RootProvider>{children}</RootProvider>
      </DeviceTypeProvider>
    </body>
  );
}
