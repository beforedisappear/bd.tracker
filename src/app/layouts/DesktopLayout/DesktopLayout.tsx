import { geistSans } from '../../fonts/geistSans';
import { geistMono } from '../../fonts/geistMono';

import { DeviceTypeProvider } from '../../providers/DeviceTypeProvider';
import { RootProvider } from '../../providers/RootProvider';

import { DESKTOP_DEVICE_TYPE } from '@/shared/lib/deviceType/s';

import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export function DesktopLayout({ children }: Props) {
  return (
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased ${DESKTOP_DEVICE_TYPE}`}
    >
      <DeviceTypeProvider
        value={{
          deviceType: DESKTOP_DEVICE_TYPE,
          isMobile: false,
          isDesktop: true,
        }}
      >
        <RootProvider>{children}</RootProvider>
      </DeviceTypeProvider>
    </body>
  );
}
