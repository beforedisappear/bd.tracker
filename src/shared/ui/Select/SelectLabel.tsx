import { cn } from '@/shared/lib/css';

import * as SelectPrimitive from '@radix-ui/react-select';

import {
  forwardRef,
  type ComponentRef,
  type ComponentPropsWithoutRef,
} from 'react';

export const SelectLabel = forwardRef<
  ComponentRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
));

SelectLabel.displayName = SelectPrimitive.Label.displayName;
