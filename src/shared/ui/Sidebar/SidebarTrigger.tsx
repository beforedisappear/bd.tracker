'use client';

import { cn } from '@/shared/lib/css';
import { ComponentRef, forwardRef, type ComponentProps } from 'react';
import { Button } from '../c';
import { useSidebar } from './Sidebar.hooks';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export const SidebarTrigger = forwardRef<
  ComponentRef<typeof Button>,
  ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar='trigger'
      variant='ghost'
      size='icon'
      className={cn('h-8 w-8 ml-auto', className)}
      onClick={event => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      {open ? <PanelLeftClose /> : <PanelLeftOpen />}
      <span className='sr-only'>Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';
