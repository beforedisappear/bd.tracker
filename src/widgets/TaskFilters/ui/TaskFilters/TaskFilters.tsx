import {
  FilterTasksByAssigned,
  FilterTasksByColor,
  FilterTasksByDateRange,
  FilterTasksBySticker,
} from '@/features/FilterTasks';

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
