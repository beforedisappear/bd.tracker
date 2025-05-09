'use client';

import { cn } from '@/shared/lib/css';
import { useSidebar } from './Sidebar.hooks';
import { forwardRef, type ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon';
};

export const SidebarContainer = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const {
      side = 'left',
      variant = 'sidebar',
      className,
      children,
      ...restProps
    } = props;

    const { isMobile, state } = useSidebar();

    const collapsible = isMobile ? 'offcanvas' : 'icon';

    return (
      <div
        ref={ref}
        className={cn('group peer block text-sidebar-foreground', {
          ['fixed z-50']: isMobile,
        })}
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
            'fixed inset-y-0 z-10 flex h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear ',
            side === 'left'
              ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
              : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
            // Adjust the padding for floating and inset variants.
            variant === 'floating' || variant === 'inset'
              ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
              : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l',
            className,
          )}
          {...restProps}
        >
          <div
            data-sidebar='sidebar'
            className='flex h-full w-full flex-col bg-sidebar-background group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow'
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
SidebarContainer.displayName = 'Sidebar';
