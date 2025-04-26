'use client';

import { NavigationMenu } from '@/shared/ui/c';

import { routes } from '../../config';

interface Props {}

export function HeaderNavMenuDesktop({}: Props) {
  return (
    <NavigationMenu
      items={routes.map(el => ({
        type: 'simple' as const,
        content: el,
      }))}
    />
  );
}
