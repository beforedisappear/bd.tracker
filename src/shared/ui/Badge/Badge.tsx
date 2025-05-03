import { cn } from '../../lib/css';
import { badgeVariants } from './Badge.utils';

import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

export function Badge(props: BadgeProps) {
  const { className, variant, asChild = false, ...restProps } = props;

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cn(badgeVariants({ variant }), className)}
      {...restProps}
    />
  );
}
