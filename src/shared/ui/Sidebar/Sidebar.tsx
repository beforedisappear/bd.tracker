import { SidebarContainer } from './SidebarContainer';
import { SidebarContent } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
import { SidebarGroup } from './SidebarGroup';
import { SidebarGroupContent } from './SidebarGroupContent';
import { SidebarGroupLabel } from './SidebarGroupLabel';
import { SidebarHeader } from './SidebarHeader';

import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
import { SidebarMenu } from './SidebarMenu';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarMenuButton } from './SidebarMenuButton';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

export function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
}
