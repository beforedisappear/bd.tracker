import { cn } from '../../lib/css';
import { badgeVariants } from './Badge.utils';

import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
