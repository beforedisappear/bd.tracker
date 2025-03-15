import { cn } from '@/shared/lib/css';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import {
  forwardRef,
  type ComponentRef,
  type ComponentPropsWithoutRef,
} from 'react';

export const AvatarContainer = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
));
AvatarContainer.displayName = AvatarPrimitive.Root.displayName;
