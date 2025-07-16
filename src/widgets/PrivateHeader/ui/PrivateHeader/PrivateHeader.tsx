'use client';

import { PrivateHeaderLayout } from '../PrivateHeaderLayout/PrivateHeaderLayout';

import { ManageBoards } from '@/features/Board/ManageBoards';
import {
  CreateBoard,
  CREATE_BOARD_BTN_WIDTH,
} from '@/features/Board/CreateBoard';
import { SetupProject } from '@/features/Project/SetupProject';

import { useSidebar } from '@/shared/ui/c';
import { usePathname } from 'next/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/c';
import { useRef } from 'react';

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
  const bottomContentRef = useRef<HTMLDivElement>(null);

  const title = (
    <span className='text-base font-medium'>{routesMetadata[route].title}</span>
  );

  const bottomContent: MapRouteToNode = {
    [AppRoutes.PROJECT_BY_ID]: (
      <div
        ref={bottomContentRef}
        className='flex items-center gap-2'
        style={{ width: getHeaderWidth({ isMobile, isSidebarOpen }) }}
      >
        <ManageBoards
          containerRef={bottomContentRef}
          occupiedWidth={CREATE_BOARD_BTN_WIDTH}
        />
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
