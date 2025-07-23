'use client';

import { ScrollArea } from '@/shared/ui/c';
import { FilterTasksByAssigned } from '@/features/FilterTasks/FilterTasksByAssigned';
import { FilterTasksByColor } from '@/features/FilterTasks/FilterTasksByColor';
import { FilterTasksByDateRange } from '@/features/FilterTasks/FilterTasksByDateRange';
import { FilterTasksBySticker } from '@/features/FilterTasks/FilterTasksBySticker';

import { useDeviceType } from '@/shared/lib/deviceType/c';

import { cn } from '@/shared/lib/css';

export function TaskFilters() {
  const { isMobile } = useDeviceType();

  return (
    <ScrollArea
      scrollBar={{ orientation: 'horizontal' }}
      className={cn('w-fit -mb-3 pb-3', {
        'max-w-fit w-[calc(100vw-8rem)]': isMobile,
      })}
      viewportClassName='bg-muted rounded-md'
    >
      <div className='flex flex-row gap-2 w-full'>
        <FilterTasksByAssigned />
        <FilterTasksByColor />
        <FilterTasksByDateRange />
        <FilterTasksBySticker />
      </div>
    </ScrollArea>
  );
}
