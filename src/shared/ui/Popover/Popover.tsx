'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';

import { PopoverContent } from './PopoverContent';

import type { ComponentProps } from 'react';

export type PopoverContentProps = ComponentProps<typeof PopoverContent>;

interface IProps extends ComponentProps<typeof PopoverContainer> {
  trigger: React.ReactNode;
  className?: string;
  content?: PopoverContentProps;
}

const PopoverContainer = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

export function Popover(props: IProps) {
  const {
    trigger,
    children,
    className,
    content: contentProps,
    ...restProps
  } = props;

  return (
    <PopoverContainer {...restProps}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className={className} {...contentProps}>
        {children}
      </PopoverContent>
    </PopoverContainer>
  );
}
