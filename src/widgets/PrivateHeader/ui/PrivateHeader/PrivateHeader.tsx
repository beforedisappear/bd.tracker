'use client';

import { SwitchTheme } from '@/features/SwitchTheme';
import { SidebarTrigger } from '@/shared/ui/c';
import { SelectBoard } from '@/features/SelectBoard';
import { CreateBoard } from '@/features/CreateBoard';
import { ManageProjectMembers } from '@/features/ManageProjectMembers';

import { usePathname } from 'next/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/c';

import { cn } from '@/shared/lib/css';

import { getRouteByPath } from '@/shared/lib/routes';
import { AppRoutes, routesMetadata } from '@/shared/config/routes';

interface Props {}

export function PrivateHeader({}: Props) {
  const { isMobile } = useDeviceType();
  const pathname = usePathname()!;
  const route = getRouteByPath(pathname);

  const isProjectByIdRoute = route === AppRoutes.PROJECT_BY_ID;

  const title = (
    <span className='text-base font-medium'>{routesMetadata[route].title}</span>
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex flex-col gap-2 min-h-14 h-auto px-4 py-3 bg-sidebar-background lg:max-w-[100vw] md:static md:min-h-12',
        { 'pb-0': isProjectByIdRoute },
      )}
    >
      <div className='flex items-center justify-between'>
        {isMobile && <SidebarTrigger />}

        {isProjectByIdRoute ? (
          <ManageProjectMembers>{title}</ManageProjectMembers>
        ) : (
          title
        )}

        <SwitchTheme />
      </div>

      {isProjectByIdRoute && (
        <div
          className='flex gap-2 items-center max-w-7xl 
          xxl:max-w-6xl
          xl:max-w-4xl
          lg:max-w-2xl
          md:max-w-xl
          sm:max-w-full'
        >
          <SelectBoard />
          <CreateBoard />
        </div>
      )}
    </header>
  );
}
