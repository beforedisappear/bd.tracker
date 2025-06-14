'use client';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { ScrollBar, ScrollBarProps } from './ScrollBar';

import { cn } from '@/shared/lib/css';
import {
  forwardRef,
  type ComponentRef,
  type ComponentPropsWithoutRef,
  RefObject,
} from 'react';

export type ScrollAreaContainerProps = ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
> & {
  scrollBar?: ScrollBarProps;
  viewportRef?: RefObject<HTMLDivElement | null>;
};

export const ScrollAreaContainer = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaContainerProps
>(({ className, children, scrollBar, viewportRef, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      ref={viewportRef}
      data-testid='scroll-area-viewport'
      className='h-full w-full rounded-[inherit]'
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar {...scrollBar} />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollAreaContainer.displayName = ScrollAreaPrimitive.Root.displayName;
