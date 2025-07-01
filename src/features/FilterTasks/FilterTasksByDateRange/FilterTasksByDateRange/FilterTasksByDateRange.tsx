import { Popover } from '@/shared/ui/c';
import { FilterTasksByDateRangeTrigger } from '../FilterTasksByDateRangeTrigger/FilterTasksByDateRangeTrigger';
import { FilterTasksByDateRangeContent } from '../FilterTasksByDateRangeContent';

export function FilterTasksByDateRange() {
  return (
    <Popover
      trigger={<FilterTasksByDateRangeTrigger />}
      className='flex flex-col w-72 min-h-[400px] h-auto gap-2'
      content={{ align: 'start' }}
    >
      <FilterTasksByDateRangeContent />
    </Popover>
  );
}
