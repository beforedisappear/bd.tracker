import { cn } from '@/shared/lib/css';

import * as SelectPrimitive from '@radix-ui/react-select';

import {
  forwardRef,
  type ComponentRef,
  type ComponentPropsWithoutRef,
} from 'react';

export const SelectSeparator = forwardRef<
  ComponentRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));

SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
