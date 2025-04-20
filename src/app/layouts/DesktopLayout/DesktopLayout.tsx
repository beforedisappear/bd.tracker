import { DeviceTypeProdiver } from '../../providers/DeviceTypeProvider';

import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export function DesktopLayout({ children }: Props) {
  return (
    <DeviceTypeProdiver
      value={{ deviceType: 'desktop', isMobile: false, isDesktop: true }}
    >
      {children}
    </DeviceTypeProdiver>
  );
}
