import { cn } from '@/shared/lib/css';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';

import { NavigationMenuViewport } from './NavigationMenuViewport';
import {
  forwardRef,
  type ComponentRef,
  type ComponentPropsWithoutRef,
} from 'react';

export const NavigationMenuContainer = forwardRef<
  ComponentRef<typeof NavigationMenuPrimitive.Root>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      'relative z-10 flex max-w-max flex-1 items-center justify-center',
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenuContainer.displayName = NavigationMenuPrimitive.Root.displayName;
