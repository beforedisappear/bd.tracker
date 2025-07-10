'use client';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { ScrollBar, ScrollBarProps } from './ScrollBar';

import { cn } from '@/shared/lib/css';
import {
  forwardRef,
  type ComponentRef,
  type ComponentPropsWithoutRef,
  type RefObject,
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
>((props, ref) => {
  const { className, children, scrollBar, viewportRef, ...restProps } = props;

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      {...restProps}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-testid='scroll-area-viewport'
        className={cn('h-full w-full rounded-[inherit]')}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar {...scrollBar} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollAreaContainer.displayName = ScrollAreaPrimitive.Root.displayName;
