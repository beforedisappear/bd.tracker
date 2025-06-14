import { Popover } from '@/shared/ui/c';
import { FilterTasksByAssignedTrigger } from '../FilterTasksByAssignedTrigger/FilterTasksByAssignedTrigger';
import { FilterTasksByAssignedContent } from '../FilterTasksByAssignedContent/FilterTasksByAssignedContent';

export function FilterTasksByAssigned() {
  return (
    <Popover
      trigger={<FilterTasksByAssignedTrigger />}
      className='flex flex-col w-80 h-[180px] gap-2 pr-0'
      content={{ align: 'start' }}
    >
      <FilterTasksByAssignedContent />
    </Popover>
  );
}
