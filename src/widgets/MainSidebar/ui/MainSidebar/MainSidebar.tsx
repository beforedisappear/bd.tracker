/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Sidebar, useSidebar } from '@/shared/ui/c';
import { usePathname } from 'next/navigation';
import { useTenant } from '@/shared/lib/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/c';
import { useEffect } from 'react';
import { useMainSidebarProjects } from '../../model';

import {
  getMainSidebarGroupItems,
  getSideBarFooterItems,
  getMainSidebarHeaderItems,
} from '../../config';

interface Props {}

export function MainSidebar({}: Props) {
  const { isMobile } = useDeviceType();
  const { setIsSidebarOpen } = useSidebar();
  const pathname = usePathname()!;
  const tenant = useTenant();

  const projects = useMainSidebarProjects(tenant);

  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [isMobile, pathname]);

  const headerItems = getMainSidebarHeaderItems();
  const groupItems = getMainSidebarGroupItems({
    tenant,
    pathname,
    projects,
  });
  const footerItems = getSideBarFooterItems();

  return (
    <Sidebar
      headerItems={headerItems}
      groupItems={groupItems}
      footerItems={footerItems}
    />
  );
}
