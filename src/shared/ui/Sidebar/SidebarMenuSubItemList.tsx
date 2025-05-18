import Link from 'next/link';
import { SidebarMenuSubButton } from './SidebarMenuSubButton';
import { SidebarMenuSubItem } from './SidebarMenuSubItem';
import { SidebarMenuSub } from './SidebarMenuSub';
import { SidebarMenuSubSkeleton } from './SidebarMenuSubSkeleton';
import { SidebarSeparator } from './SidebarSeparator';

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

        return (
          <SidebarMenuSubItem key={el.link.title}>
            <SidebarMenuSubButton asChild isActive={el.link.isActive}>
              <Link href={el.link.url}>
                {el.link.icon}
                <span>{el.link.title}</span>
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        );
      })}
    </SidebarMenuSub>
  );
}
