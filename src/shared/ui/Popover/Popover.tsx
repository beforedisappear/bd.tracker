'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { PopoverContent } from './PopoverContent';

const PopoverContainer = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

interface IProps extends React.PropsWithChildren {
  trigger: React.ReactNode;
  className?: string;
}

export function Popover(props: IProps) {
  const { trigger, children, ...rest } = props;

  return (
    <PopoverContainer>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent {...rest}>{children}</PopoverContent>
    </PopoverContainer>
  );
}
