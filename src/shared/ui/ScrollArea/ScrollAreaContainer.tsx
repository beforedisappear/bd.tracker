'use client';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { ScrollBar, ScrollBarProps } from './ScrollBar';

import { cn } from '@/shared/lib/css';
import {
  forwardRef,
  type ComponentRef,
  type ComponentPropsWithoutRef,
} from 'react';

export type ScrollAreaContainerProps = ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
> & { scrollBar?: ScrollBarProps };

export const ScrollAreaContainer = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaContainerProps
>(({ className, children, scrollBar, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className='h-full w-full rounded-[inherit]'>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar {...scrollBar} />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollAreaContainer.displayName = ScrollAreaPrimitive.Root.displayName;
