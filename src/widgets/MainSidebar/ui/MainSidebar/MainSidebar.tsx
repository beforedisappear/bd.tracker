/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Sidebar, useSidebar } from '@/shared/ui/c';
import { useParams, usePathname } from 'next/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/c';
import { useEffect } from 'react';

import {
  getMainSidebarGroupItems,
  getSideBarFooterItems,
  getMainSidebarHeaderItems,
} from '../../config';

interface Props {}

export function MainSidebar({}: Props) {
  const { isMobile } = useDeviceType();
  const pathname = usePathname()!;
  const { tenant } = useParams<{ tenant: string }>()!;
  const { setIsSidebarOpen, state } = useSidebar();

  useEffect(() => {
    if (isMobile && state === 'expanded') setIsSidebarOpen(false);
  }, [isMobile, pathname]);

  return (
    <Sidebar
      headerItems={getMainSidebarHeaderItems()}
      groupItems={getMainSidebarGroupItems(tenant, pathname)}
      footerItems={getSideBarFooterItems()}
    />
  );
}
