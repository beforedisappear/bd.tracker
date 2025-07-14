import Link from 'next/link';
import { SidebarMenuSubButton } from './SidebarMenuSubButton';
import { SidebarMenuSubItem } from './SidebarMenuSubItem';
import { SidebarMenuSub } from './SidebarMenuSub';
import { SidebarMenuSubSkeleton } from './SidebarMenuSubSkeleton';
import { SidebarSeparator } from './SidebarSeparator';

import { RESTRICTED_VIEW_MESSAGE } from '@/shared/constants';
import { toast } from 'sonner';
import type { MenuSubItem } from './Sidebar.types';

interface Props {
  data: MenuSubItem[];
}

export function SidebarMenuSubItemList({ data }: Props) {
  return (
    <SidebarMenuSub>
      {data.map((el, i) => {
        if (el.type === 'separator') {
          return <SidebarSeparator key={`sub-item-separator-${i}`} />;
        }

        if (el.type === 'skeleton') {
          return <SidebarMenuSubSkeleton key={`sub-item-skeleton-${i}`} />;
        }

        const content = (
          <>
            {el.link.icon}
            <span>{el.link.title}</span>
          </>
        );

        return (
          <SidebarMenuSubItem key={el.link.title}>
            <SidebarMenuSubButton asChild isActive={el.link.isActive}>
              {el.link.isDisabled ? (
                <span
                  className='opacity-50'
                  onClick={() => toast.error(RESTRICTED_VIEW_MESSAGE)}
                >
                  {content}
                </span>
              ) : (
                <Link href={el.link.url}>{content}</Link>
              )}
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        );
      })}
    </SidebarMenuSub>
  );
}
