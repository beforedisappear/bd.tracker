'use client';

import { cn } from '@/shared/lib/css';

import { useSidebar } from './Sidebar.hooks';
import { SIDEBAR_WIDTH_MOBILE } from './Sidebar.constants';
import { Sheet } from '../c';
import { CSSProperties, forwardRef } from 'react';

export const SidebarContainer = forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    side?: 'left' | 'right';
    variant?: 'sidebar' | 'floating' | 'inset';
    collapsible?: 'offcanvas' | 'icon' | 'none';
  }
>(
  (
    {
      side = 'left',
      variant = 'sidebar',
      collapsible = 'offcanvas',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === 'none') {
      return (
        <div
          className={cn(
            'flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground',
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet
          open={openMobile}
          onOpenChange={setOpenMobile}
          title='Sidebar'
          description='Displays the mobile sidebar.'
          headerClassName='sr-only'
          content={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            'data-sidebar': 'sidebar',
            'data-mobile': true,
            className:
              'w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden',
            style: {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as CSSProperties,
            side,
          }}
          {...props}
        >
          <div className='flex h-full w-full flex-col'>{children}</div>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className='group peer block text-sidebar-foreground md:hidden'
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            'relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear',
            'group-data-[collapsible=offcanvas]:w-0',
            'group-data-[side=right]:rotate-180',
            variant === 'floating' || variant === 'inset'
              ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
              : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]',
          )}
        />
        <div
          className={cn(
            'fixed inset-y-0 z-10 flex h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:hidden',
            side === 'left'
              ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
              : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
            // Adjust the padding for floating and inset variants.
            variant === 'floating' || variant === 'inset'
              ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
              : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l',
            className,
          )}
          {...props}
        >
          <div
            data-sidebar='sidebar'
            className='flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow'
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
SidebarContainer.displayName = 'Sidebar';
