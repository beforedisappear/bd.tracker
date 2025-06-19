import { Popover } from '@/shared/ui/c';
import { BoardAssigneesPopoverContent } from '../BoardAssigneesPopoverContent/BoardAssigneesPopoverContent';
import { BoardAssigneesPopoverTrigger } from '../BoardAssigneesPopoverTrigger/BoardAssigneesPopoverTrigger';
import { type Task } from '@/entities/Board';

interface Props {
  taskId: Task['id'];
  assignees: Task['assignees'];
}

export function BoardAssigneesPopover(props: Props) {
  return (
    <Popover
      trigger={<BoardAssigneesPopoverTrigger assignees={props.assignees} />}
      className='flex flex-col w-80 h-[180px] gap-2'
      content={{ align: 'end' }}
    >
      <BoardAssigneesPopoverContent {...props} />
    </Popover>
  );
}
