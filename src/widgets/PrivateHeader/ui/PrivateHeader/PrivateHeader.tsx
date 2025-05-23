'use client';

import { SwitchTheme } from '@/features/SwitchTheme';
import { SidebarTrigger } from '@/shared/ui/c';
import { SelectBoard } from '@/features/SelectBoard';
import { AddBoard } from '@/features/AddBoard';

import { usePathname } from 'next/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/c';

import { getRouteByPath } from '@/shared/lib/routes';
import { AppRoutes, routesMetadata } from '@/shared/config/routes';
interface Props {}

export function PrivateHeader({}: Props) {
  const { isMobile } = useDeviceType();
  const pathname = usePathname()!;
  const route = getRouteByPath(pathname);

  return (
    <header
      className='sticky top-0 z-50
      flex flex-col gap-2 min-h-14 h-auto px-4 py-3 bg-sidebar-background
      md:static md:h-12'
    >
      <div className='flex items-center justify-between'>
        {isMobile && <SidebarTrigger />}

        <span className='text-base font-medium'>
          {routesMetadata[route].title}
        </span>

        <SwitchTheme />
      </div>

      {route === AppRoutes.PROJECT_BY_ID && (
        <div className='flex gap-4 items-center'>
          <SelectBoard />
          <AddBoard />
        </div>
      )}
    </header>
  );
}
