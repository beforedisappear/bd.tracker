'use client';

import {
  DeviceTypeContext,
  type DeviceContext,
} from '@/shared/lib/deviceType/c';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  value: DeviceContext;
}

export function DeviceTypeProdiver({ value, children }: Props) {
  return <DeviceTypeContext value={value}>{children}</DeviceTypeContext>;
}
