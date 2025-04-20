import { DeviceTypeProdiver } from '../../providers/DeviceTypeProvider';

import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export function MobileLayout({ children }: Props) {
  return (
    <DeviceTypeProdiver
      value={{ deviceType: 'mobile', isMobile: true, isDesktop: false }}
    >
      {children}
    </DeviceTypeProdiver>
  );
}
