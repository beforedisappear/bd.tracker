import { cn } from '../../lib/css';

import {
  forwardRef,
  type ComponentRef,
  type ComponentPropsWithoutRef,
} from 'react';

export const InputOTPGroup = forwardRef<
  ComponentRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center', className)} {...props} />
));

InputOTPGroup.displayName = 'InputOTPGroup';
