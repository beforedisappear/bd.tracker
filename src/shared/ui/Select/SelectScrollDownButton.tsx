import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/shared/lib/css';

import * as SelectPrimitive from '@radix-ui/react-select';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentRef,
} from 'react';

export const SelectScrollDownButton = forwardRef<
  ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronDownIcon className='h-4 w-4' />
  </SelectPrimitive.ScrollDownButton>
));

SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;
