import { Popover } from '@/shared/ui/c';
import { ViewBoardAssigneesPopoverContent } from '../ViewBoardAssigneesPopoverContent/ViewBoardAssigneesPopoverContent';
import { ViewBoardAssigneesPopoverTrigger } from '../ViewBoardAssigneesPopoverTrigger/ViewBoardAssigneesPopoverTrigger';
import type { Task } from '@/entities/Board';

interface Props {
  taskId: Task['id'];
  assignees: Task['assignees'];
}

export function ViewBoardAssigneesPopover(props: Props) {
  return (
    <Popover
      trigger={<ViewBoardAssigneesPopoverTrigger />}
      className='flex flex-col w-80 h-[180px] gap-2'
    >
      <ViewBoardAssigneesPopoverContent {...props} />
    </Popover>
  );
}
