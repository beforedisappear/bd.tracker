import { cn } from '@/shared/lib/css';
import { forwardRef, type ComponentProps } from 'react';
import { Skeleton } from '../Skeleton/Skeleton';

type Props = ComponentProps<'div'> & {
  showIcon?: boolean;
};

export const SidebarMenuSkeleton = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { className, showIcon = true, ...restProps } = props;

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
        />
      </div>
    );
  },
);
SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton';
