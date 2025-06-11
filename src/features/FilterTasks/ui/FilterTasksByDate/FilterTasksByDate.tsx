import { Popover } from '@/shared/ui/c';
import { FilterTasksByDateTrigger } from '../FilterTasksBySticker/FilterTasksByDateTrigger/FilterTasksByDateTrigger';
import { FilterTasksByDateContent } from '../FilterTasksByDateContent/FilterTasksByDateContent';

export function FilterTasksByDate() {
  return (
    <Popover
      trigger={<FilterTasksByDateTrigger />}
      className='flex flex-col w-72 h-auto gap-2'
      content={{ align: 'start' }}
    >
      <FilterTasksByDateContent />
    </Popover>
  );
}
