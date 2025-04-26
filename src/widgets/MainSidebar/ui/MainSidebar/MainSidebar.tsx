'use client';

import { Sidebar } from '@/shared/ui/c';
import { useParams, usePathname } from 'next/navigation';
import {
  getMainSidebarGroupItems,
  getSideBarFooterItems,
} from '../../config/mainSidebar.config';

interface Props {}

export function MainSidebar({}: Props) {
  const pathname = usePathname()!;
  const { tenant } = useParams<{ tenant: string }>()!;

  return (
    <Sidebar
      groupItems={getMainSidebarGroupItems(tenant, pathname)}
      footerItems={getSideBarFooterItems()}
    />
  );
}
