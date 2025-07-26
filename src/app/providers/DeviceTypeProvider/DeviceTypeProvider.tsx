'use client';

import {
  DeviceTypeContext,
  type DeviceContext,
} from '@/shared/lib/deviceType/c';
import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  value: DeviceContext;
}

export function DeviceTypeProvider({ value, children }: Props) {
  return <DeviceTypeContext value={value}>{children}</DeviceTypeContext>;
}
