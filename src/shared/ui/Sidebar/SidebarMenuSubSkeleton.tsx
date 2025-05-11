import { cn } from '@/shared/lib/css';
import { Skeleton } from '../Skeleton/Skeleton';

export function SidebarMenuSubSkeleton() {
  return (
    <div
      data-sidebar='menu-sub-skeleton'
      className={cn(
        'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2',
        'text-sm text-sidebar-foreground group-data-[collapsible=icon]:hidden',
      )}
    >
      <Skeleton
        className='size-4 min-w-4 rounded-md'
        data-sidebar='menu-sub-skeleton-icon'
      />
      <Skeleton
        className='h-4 max-w-[--skeleton-width] flex-1 truncate'
        data-sidebar='menu-sub-skeleton-text'
      />
    </div>
  );
}
