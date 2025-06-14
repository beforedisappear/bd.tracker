import { Popover } from '@/shared/ui/c';
import { FilterTasksByDateRangeTrigger } from '../FilterTasksByDateRangeTrigger/FilterTasksByDateRangeTrigger';
import { FilterTasksByDateRangeContent } from '../FilterTasksByDateRangeContent/FilterTasksByDateRangeContent';

export function FilterTasksByDateRange() {
  return (
    <Popover
      trigger={<FilterTasksByDateRangeTrigger />}
      className='flex flex-col w-72 h-auto gap-2'
      content={{ align: 'start' }}
    >
      <FilterTasksByDateRangeContent />
    </Popover>
  );
}
