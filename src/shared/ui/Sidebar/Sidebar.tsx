import { cn } from '@/shared/lib/css';

import Link from 'next/link';
import { SidebarContainer } from './SidebarContainer';
import { SidebarContent } from './SidebarContent';
import { SidebarGroup } from './SidebarGroup';
import { SidebarGroupContent } from './SidebarGroupContent';
import { SidebarGroupLabel } from './SidebarGroupLabel';
import { SidebarMenu } from './SidebarMenu';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarMenuButton } from './SidebarMenuButton';
import { SidebarHeader } from './SidebarHeader';
import { SidebarSeparator } from './SidebarSeparator';
import { SidebarMenuBadge } from './SidebarMenuBadge';
import { SidebarMenuAction } from './SidebarMenuAction';
import { SidebarMenuSubItem } from './SidebarMenuSubItem';
import { SidebarMenuSubButton } from './SidebarMenuSubButton';
import { SidebarMenuSub } from './SidebarMenuSub';
import { SidebarFooter } from './SidebarFooter';
import { SidebarTrigger } from './SidebarTrigger';

import type { ComponentProps, ReactNode } from 'react';
import type { SidebarGroupEl } from './Sidebar.types';
import { SidebarGroupAction } from './SidebarGroupAction';

interface IProps extends ComponentProps<typeof SidebarContainer> {
  headerContent?: ReactNode;
  headerClassName?: string;
  footerContent?: ReactNode;
  footerClassName?: string;
  groupItems: SidebarGroupEl[];
}

export function Sidebar(props: IProps) {
  const {
    headerContent,
    headerClassName,
    footerContent,
    footerClassName,
    variant = 'sidebar',
    collapsible = 'icon',
    groupItems = [],
    ...restProps
  } = props;

  return (
    <SidebarContainer
      variant={variant}
      collapsible={collapsible}
      {...restProps}
    >
      <SidebarTrigger />

      {headerContent && (
        <SidebarHeader
          className={cn(
            headerClassName,
            'group-data-[collapsible=icon]:hidden',
          )}
        >
          {headerContent}
        </SidebarHeader>
      )}

      <SidebarContent>
        {groupItems.map((groupItem, i) => {
          if (groupItem.type === 'separator')
            return <SidebarSeparator key={i} />;

          return (
            <SidebarGroup key={groupItem.label}>
              <SidebarGroupLabel>{groupItem.label}</SidebarGroupLabel>

              {groupItem.action && (
                <SidebarGroupAction
                  title={groupItem.action.title}
                  onClick={groupItem.action.onClick}
                >
                  {groupItem.action.icon}
                  <span className='sr-only'>{groupItem.action.title}</span>
                </SidebarGroupAction>
              )}

              <SidebarGroupContent>
                <SidebarMenu>
                  {groupItem.items.map((item, i) => {
                    if (item.type === 'separator')
                      return <SidebarSeparator key={i} />;

                    return (
                      <SidebarMenuItem key={item.link.title}>
                        <SidebarMenuButton asChild>
                          <Link href={item.link.url}>
                            {item.link.icon}
                            <span>{item.link.title}</span>
                          </Link>
                        </SidebarMenuButton>

                        {item.action && (
                          <SidebarMenuAction
                            title={item.action.title}
                            onClick={item.action.onClick}
                          >
                            {item.action.icon}
                            <span className='sr-only'>{item.action.title}</span>
                          </SidebarMenuAction>
                        )}

                        {item.badge && (
                          <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                        )}

                        {item.subItems && (
                          <SidebarMenuSub>
                            {item.subItems.map(subItem => {
                              return (
                                <SidebarMenuSubItem key={subItem.link.title}>
                                  <SidebarMenuSubButton asChild>
                                    <Link href={subItem.link.url}>
                                      {subItem.link.icon}
                                      <span>{subItem.link.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        )}
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      {footerContent && (
        <SidebarFooter
          className={cn(
            footerClassName,
            'group-data-[collapsible=icon]:hidden',
          )}
        >
          {footerContent}
        </SidebarFooter>
      )}
    </SidebarContainer>
  );
}
