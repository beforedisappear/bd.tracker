'use client';

import { NavigationMenu } from '@/shared/ui/c';

import { routes } from '../../config';

interface Props {}

export function DesktopHeaderNavMenu({}: Props) {
  return (
    <NavigationMenu
      className='md:hidden'
      items={routes.map(el => ({
        type: 'simple' as const,
        content: el,
      }))}
    />
  );
}
