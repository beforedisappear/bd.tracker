import { cn } from '@/shared/lib/css';
import type { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  numberOfTextLines?: number;
}

function Skeleton({ className, numberOfTextLines = 0, ...props }: Props) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-primary/10 text-transparent',
        className,
      )}
      {...props}
    >
      {numberOfTextLines > 0
        ? new Array(numberOfTextLines).fill('_').map(() => `\u00A0\n`)
        : null}
    </div>
  );
}

export { Skeleton };
