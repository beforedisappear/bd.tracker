'use client';

import { ScrollArea } from '@/shared/ui/c';
import { FilterTasksByAssigned } from '@/features/FilterTasks/FilterTasksByAssigned';
import { FilterTasksByColor } from '@/features/FilterTasks/FilterTasksByColor';
import { FilterTasksByDateRange } from '@/features/FilterTasks/FilterTasksByDateRange';
import { FilterTasksBySticker } from '@/features/FilterTasks/FilterTasksBySticker';

export function TaskFilters() {
  return (
    <ScrollArea
      scrollBar={{ orientation: 'horizontal' }}
      className='w-fit -mb-3 pb-3 
      mobile:max-w-fit mobile:w-[calc(100vw-8rem)]'
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
