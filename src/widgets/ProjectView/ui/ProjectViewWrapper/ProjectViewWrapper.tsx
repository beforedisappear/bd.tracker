'use client';

import { ScrollArea, useSidebar } from '@/shared/ui/c';
import { useDeviceType } from '@/shared/lib/deviceType/useDeviceType';

import { getLayoutWidth } from '../../lib/getLayoutWidth';
import { getContentMargin } from '../../lib/getContentMargin';

interface Props {
  children: React.ReactNode;
}

export function ProjectViewWrapper({ children }: Props) {
  const { isMobile } = useDeviceType();
  const { isSidebarOpen } = useSidebar();

  return (
    <ScrollArea
      type='hover'
      scrollBar={{
        orientation: 'horizontal',
        style: { marginInline: getContentMargin(isMobile) },
      }}
      className='flex h-full pb-5'
      style={{
        width: getLayoutWidth(isSidebarOpen, isMobile),
        marginInline: `-${getContentMargin(isMobile)}`,
      }}
    >
      {children}
    </ScrollArea>
  );
}
