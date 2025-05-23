'use client';

import { cn } from '@/shared/lib/css';
import { Slot } from '@radix-ui/react-slot';

import { buttonVariants } from './Button.utils';
import { forwardRef } from 'react';

import type { ButtonProps } from './Button.types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
