import { cn } from '@/shared/lib/css';
import { ChevronDown } from 'lucide-react';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentRef,
} from 'react';
import { navigationMenuTriggerStyle } from './NavigationMenu.utils';

export const NavigationMenuTrigger = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'group', className)}
    {...props}
  >
    {children}{' '}
    <ChevronDown
      className='relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180'
      aria-hidden='true'
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;
