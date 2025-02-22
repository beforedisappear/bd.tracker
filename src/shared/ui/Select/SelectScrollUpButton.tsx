import { ChevronUpIcon } from 'lucide-react';
import { cn } from '@/shared/lib/css';

import * as SelectPrimitive from '@radix-ui/react-select';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentRef,
} from 'react';

export const SelectScrollUpButton = forwardRef<
  ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronUpIcon className='h-4 w-4' />
  </SelectPrimitive.ScrollUpButton>
));

SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
