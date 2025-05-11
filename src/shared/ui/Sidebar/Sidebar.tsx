'use client';

import { cn } from '@/shared/lib/css';
import { ChevronRight } from 'lucide-react';

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
import { SidebarFooter } from './SidebarFooter';
import { SidebarGroupAction } from './SidebarGroupAction';
import { SidebarMenuSkeleton } from './SidebarMenuSkeleton';
import { SidebarMenuSubItemList } from './SidebarMenuSubItemList';
import { SidebarCollapsibleMenuItem } from './SidebarCollapsibleMenuItem';

import type { ComponentProps, ReactNode } from 'react';
import type { SidebarGroupEl } from './Sidebar.types';

interface IProps
  extends Omit<ComponentProps<typeof SidebarContainer>, 'collapsible'> {
  headerItems?: ReactNode[];
  headerClassName?: string;
  footerItems?: ReactNode[];
  footerClassName?: string;
  groupItems: SidebarGroupEl[];
}

export function Sidebar(props: IProps) {
  const {
    headerItems,
    headerClassName,
    footerItems,
    footerClassName,
    variant = 'sidebar',
    groupItems = [],
    ...restProps
  } = props;

  return (
    <SidebarContainer variant={variant} {...restProps}>
      <SidebarHeader className={cn(headerClassName)}>
        <SidebarMenu>
          {headerItems &&
            headerItems.length > 0 &&
            headerItems.map((child, i) => (
              <SidebarMenuItem key={i}>
                <SidebarMenuButton asChild>{child}</SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {groupItems.map((groupItem, i) => {
          if (groupItem.type === 'separator')
            return <SidebarSeparator key={`group-separator-${i}`} />;

          if (groupItem.type === 'skeleton')
            return <SidebarMenuSkeleton key={`group-skeleton-${i}`} />;

          return (
            <SidebarGroup key={`group-${i}`}>
              {groupItem.label && (
                <SidebarGroupLabel>{groupItem.label}</SidebarGroupLabel>
              )}

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
                      return (
                        <SidebarSeparator key={`group-item-separator-${i}`} />
                      );

                    if (item.type === 'item-link')
                      return (
                        <SidebarMenuItem key={item.link.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={item.link.isActive}
                          >
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
                              <span className='sr-only'>
                                {item.action.title}
                              </span>
                            </SidebarMenuAction>
                          )}

                          {item.badge !== undefined && (
                            <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                          )}
                        </SidebarMenuItem>
                      );

                    if (item.type === 'item-sub')
                      return (
                        <SidebarCollapsibleMenuItem
                          key={item.trigger.label}
                          defaultOpen={item.isDefaultOpen}
                          disabled={item.subItems.length === 0}
                          trigger={
                            <SidebarMenuButton>
                              {item.trigger.icon}
                              <span className='text-nowrap'>
                                {item.trigger.label}
                              </span>
                              <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                            </SidebarMenuButton>
                          }
                        >
                          <SidebarMenuSubItemList data={item.subItems} />
                        </SidebarCollapsibleMenuItem>
                      );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className={cn(footerClassName)}>
        <SidebarMenu>
          {footerItems &&
            footerItems.length > 0 &&
            footerItems.map((child, i) => (
              <SidebarMenuItem key={i}>
                <SidebarMenuButton asChild>{child}</SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarFooter>
    </SidebarContainer>
  );
}
