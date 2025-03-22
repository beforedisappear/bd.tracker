'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';

import { PopoverContent } from './PopoverContent';
import type { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  trigger: React.ReactNode;
  className?: string;
}

const PopoverContainer = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

export function Popover(props: IProps) {
  const { trigger, children, ...rest } = props;

  return (
    <PopoverContainer>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent {...rest}>{children}</PopoverContent>
    </PopoverContainer>
  );
}
