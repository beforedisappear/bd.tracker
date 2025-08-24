import { cn } from '@/shared/lib/css';

import {
  forwardRef,
  useContext,
  type ComponentRef,
  type ComponentPropsWithoutRef,
} from 'react';

import { OTPInputContext } from 'input-otp';

export const InputOTPSlot = forwardRef<
  ComponentRef<'div'>,
  ComponentPropsWithoutRef<'div'> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = useContext(OTPInputContext);

  const slot = inputOTPContext.slots[index];

  if (!slot) return null;

  const { char, hasFakeCaret, isActive } = slot;

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
        isActive && 'z-10 ring-1 ring-ring',
        className,
      )}
      {...props}
    >
      {char}

      {hasFakeCaret && (
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='h-4 w-px animate-caret-blink bg-foreground duration-1000' />
        </div>
      )}
    </div>
  );
});

InputOTPSlot.displayName = 'InputOTPSlot';
