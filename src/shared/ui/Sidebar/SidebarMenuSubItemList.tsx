import Link from 'next/link';
import { SidebarMenuSubButton } from './SidebarMenuSubButton';
import { SidebarMenuSubItem } from './SidebarMenuSubItem';

import type { MenuSubItem } from './Sidebar.types';
import { SidebarMenuSub } from './SidebarMenuSub';

interface Props {
  data: MenuSubItem[];
}

export function SidebarMenuSubItemList({ data }: Props) {
  return (
    <SidebarMenuSub>
      {data.map(el => (
        <SidebarMenuSubItem key={el.link.title}>
          <SidebarMenuSubButton asChild isActive={el.link.isActive}>
            <Link href={el.link.url}>
              {el.link.icon}
              <span>{el.link.title}</span>
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
}
