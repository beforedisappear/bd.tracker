'use client';

import { PrivateHeaderLayout } from '../PrivateHeaderLayout/PrivateHeaderLayout';

import { ManageBoards } from '@/features/Board/ManageBoards';
import { CreateBoard } from '@/features/Board/CreateBoard';
import { SetupProject } from '@/features/Project/SetupProject';

import { useSidebar } from '@/shared/ui/c';
import { usePathname } from 'next/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/c';

import { getHeaderWidth } from '../../lib/getHeaderWidth';
import { getRouteByPath } from '@/shared/lib/routes';

import { AppRoutes, routesMetadata } from '@/shared/config/routes';

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

  const bottomContent: MapRouteToNode = {
    [AppRoutes.PROJECT_BY_ID]: (
      <div
        className='flex gap-2 items-center'
        style={{ width: getHeaderWidth({ isMobile, isSidebarOpen }) }}
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
