'use client';

import { usePathname } from 'next/navigation';

import { getRouteByPath } from '@/shared/lib/routes';
import { routesMetadata } from '@/shared/config/routes';
import { SwitchTheme } from '@/features/SwitchTheme';
import { SidebarTrigger } from '@/shared/ui/c';

interface Props {}

export function PrivateHeader({}: Props) {
  const pathname = usePathname()!;
  const route = getRouteByPath(pathname);

  return (
    <header
      className='sticky top-0 flex items-center justify-between h-14 px-4 py-3 bg-sidebar-background
      md:static md:h-12'
    >
      <SidebarTrigger />

      <span className='text-base font-medium'>
        {routesMetadata[route].title}
      </span>

      <SwitchTheme />
    </header>
  );
}
