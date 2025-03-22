import { cn } from '@/shared/lib/css';
import { forwardRef } from 'react';

export const CardContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col rounded-xl border bg-card text-card-foreground shadow',
      className,
    )}
    {...props}
  />
));
CardContainer.displayName = 'Card';
