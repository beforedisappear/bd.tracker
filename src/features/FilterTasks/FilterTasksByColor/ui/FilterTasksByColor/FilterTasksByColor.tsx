import { Popover } from '@/shared/ui/c';

import { FilterTasksByColorTrigger } from '../FilterTasksByColorTrigger/FilterTasksByColorTrigger';
import { FilterTasksByColorContent } from '../FilterTasksByColorContent';

export function FilterTasksByColor() {
  return (
    <Popover
      trigger={<FilterTasksByColorTrigger />}
      className='flex flex-col w-52 gap-2 min-h-[138px] h-auto'
    >
      <FilterTasksByColorContent />
    </Popover>
  );
}
