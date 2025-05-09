'use client';

import { usePathname } from 'next/navigation';

import { getRouteByPath } from '@/shared/lib/routes';
import { routesMetadata } from '@/shared/config/routes';
import { SwitchTheme } from '@/features/SwitchTheme';
interface Props {}

export function PrivateHeader({}: Props) {
  const pathname = usePathname()!;
  const route = getRouteByPath(pathname);

  return (
    <header
      className='sticky top-0 flex items-center justify-between h-14 px-4 py-3 bg-sidebar-background
      md:pl-10 md:static md:h-12'
    >
      <span className='text-base font-medium'>
        {routesMetadata[route].title}
      </span>

      <SwitchTheme />
    </header>
  );
}
