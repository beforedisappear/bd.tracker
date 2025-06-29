import { FilterTasksByAssigned } from '@/features/FilterTasks/FilterTasksByAssigned';
import { FilterTasksByColor } from '@/features/FilterTasks/FilterTasksByColor';
import { FilterTasksByDateRange } from '@/features/FilterTasks/FilterTasksByDateRange';
import { FilterTasksBySticker } from '@/features/FilterTasks/FilterTasksBySticker';

//TODO: mb add resize observer
export function TaskFilters() {
  return (
    <div className='flex flex-row gap-2 h-full bg-muted rounded-md'>
      <FilterTasksByAssigned />
      <FilterTasksByColor />
      <FilterTasksByDateRange />
      <FilterTasksBySticker />
    </div>
  );
}
