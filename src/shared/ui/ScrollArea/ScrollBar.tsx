'use client';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/shared/lib/css';
import {
  forwardRef,
  type ComponentRef,
  type ComponentPropsWithoutRef,
  ComponentProps,
} from 'react';

export type ScrollBarProps = ComponentProps<typeof ScrollBar>;

type Ref = ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>;
type Props = ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
> & {
  thumbClassName?: string;
  ['data-drag']?: boolean;
};

export const ScrollBar = forwardRef<Ref, Props>((props, ref) => {
  const {
    className,
    orientation = 'vertical',
    thumbClassName,
    ['data-drag']: dataDrag,
    ...restProps
  } = props;

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      data-testid='scroll-area-scrollbar'
      className={cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent p-[1px]',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent p-[1px]',
        className,
      )}
      data-drag={dataDrag}
      {...restProps}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className={cn('relative flex-1 rounded-full bg-border', thumbClassName)}
        data-drag={dataDrag}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
});
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
