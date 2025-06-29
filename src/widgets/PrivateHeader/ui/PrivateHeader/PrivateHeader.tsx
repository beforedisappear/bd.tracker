'use client';

import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON, useSidebar } from '@/shared/ui/c';
import { ManageBoards } from '@/features/Board/ManageBoards';
import { CreateBoard } from '@/features/Board/CreateBoard';
import { SetupProject } from '@/features/Project/SetupProject';

import { usePathname } from 'next/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/c';

import { cn } from '@/shared/lib/css';

import { getRouteByPath } from '@/shared/lib/routes';
import { AppRoutes, routesMetadata } from '@/shared/config/routes';
import { PrivateHeaderLayout } from '../PrivateHeaderLayout/PrivateHeaderLayout';

type MapRouteToNode = Partial<Record<AppRoutes, React.ReactNode>>;

interface Props {}

export function PrivateHeader({}: Props) {
  const { isMobile } = useDeviceType();
  const { isSidebarOpen } = useSidebar();
  const pathname = usePathname()!;
  const route = getRouteByPath(pathname);

  const title = (
    <span className='text-base font-medium'>{routesMetadata[route].title}</span>
  );

  const getSidebarWidth = () => {
    if (isMobile) return 'calc(100vw - 2rem)';

    const sidebarWidth = isSidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_ICON;

    return `calc(100vw - ${sidebarWidth} - 2rem)`;
  };

  const bottomContent: MapRouteToNode = {
    [AppRoutes.PROJECT_BY_ID]: (
      <div
        className={cn('flex gap-2 items-center')}
        style={{ width: getSidebarWidth() }}
      >
        <ManageBoards />
        <CreateBoard />
      </div>
    ),
  };

  const content: MapRouteToNode = {
    [AppRoutes.PROJECT_BY_ID]: <SetupProject>{title}</SetupProject>,
  };

  return (
    <PrivateHeaderLayout bottomContent={bottomContent[route]}>
      {content[route] || title}
    </PrivateHeaderLayout>
  );
}
