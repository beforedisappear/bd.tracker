import { cn } from '@/shared/lib/css';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  forwardRef,
  type ComponentRef,
  type ComponentPropsWithoutRef,
} from 'react';

export const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
));

DialogTitle.displayName = DialogPrimitive.Title.displayName;
