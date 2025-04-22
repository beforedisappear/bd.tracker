import { DeviceTypeProvider } from '../../providers/DeviceTypeProvider';

import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export function MobileLayout({ children }: Props) {
  return (
    <DeviceTypeProvider
      value={{ deviceType: 'mobile', isMobile: true, isDesktop: false }}
    >
      {children}
    </DeviceTypeProvider>
  );
}
