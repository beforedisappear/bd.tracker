'use client';

import { Sidebar } from '@/shared/ui/c';
import { useParams } from 'next/navigation';
import { getMainSidebarItems } from '../../config/mainSidebar.config';

interface Props {}

export function MainSidebar({}: Props) {
  const { tenant } = useParams<{ tenant: string }>()!;

  return <Sidebar groupItems={getMainSidebarItems(tenant)} />;
}
