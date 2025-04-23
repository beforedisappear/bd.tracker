import { cn } from '@/shared/lib/css';
import { forwardRef, useMemo, type ComponentProps } from 'react';
import { Skeleton } from '../Skeleton/Skeleton';

type Props = ComponentProps<'div'> & {
  showIcon?: boolean;
};

export const SidebarMenuSkeleton = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { className, showIcon = true, ...restProps } = props;

    // Random width between 50 to 90%.
    const width = useMemo(() => {
      return `${Math.floor(Math.random() * 40) + 50}%`;
    }, []);

    return (
      <div
        ref={ref}
        data-sidebar='menu-skeleton'
        className={cn('flex h-8 items-center gap-2 rounded-md px-4', className)}
        {...restProps}
      >
        {showIcon && (
          <Skeleton
            className='size-4 min-w-4 rounded-md'
            data-sidebar='menu-skeleton-icon'
          />
        )}

        <Skeleton
          className='h-4 max-w-[--skeleton-width] flex-1'
          data-sidebar='menu-skeleton-text'
          style={
            {
              '--skeleton-width': width,
            } as React.CSSProperties
          }
        />
      </div>
    );
  },
);
SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton';
