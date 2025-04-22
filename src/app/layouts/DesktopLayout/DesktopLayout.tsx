import { DeviceTypeProvider } from '../../providers/DeviceTypeProvider';

import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export function DesktopLayout({ children }: Props) {
  return (
    <DeviceTypeProvider
      value={{ deviceType: 'desktop', isMobile: false, isDesktop: true }}
    >
      {children}
    </DeviceTypeProvider>
  );
}
