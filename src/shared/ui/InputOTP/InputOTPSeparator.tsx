import { Minus } from 'lucide-react';

import {
  forwardRef,
  type ComponentRef,
  type ComponentPropsWithoutRef,
} from 'react';

export const InputOTPSeparator = forwardRef<
  ComponentRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => (
  <div ref={ref} role='separator' {...props}>
    <Minus />
  </div>
));

InputOTPSeparator.displayName = 'InputOTPSeparator';
