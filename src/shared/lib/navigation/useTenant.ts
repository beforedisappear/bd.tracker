'use client';

import { useParams } from 'next/navigation';

export function useTenant() {
  const { tenant } = useParams<{ tenant: string }>()!;

  return tenant;
}
