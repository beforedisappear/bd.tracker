import { Popover, type PopoverContentProps } from '@/shared/ui/c';
import { BoardTaskAssigneesPopoverContent } from '../BoardTaskAssigneesPopoverContent/BoardTaskAssigneesPopoverContent';
import { BoardTaskAssigneesPopoverTrigger } from '../BoardTaskAssigneesPopoverTrigger/BoardTaskAssigneesPopoverTrigger';

import type { AssigneesPopoverTriggerDirection, Task } from '../../model/types';

interface Props {
  taskId: Task['id'];
  assignees: Task['assignees'];
  direction?: AssigneesPopoverTriggerDirection;
  avatarLimit?: number;
  align?: PopoverContentProps['align'];
  offAll?: boolean;
}

export function BoardTaskAssigneesPopover(props: Props) {
  const { direction = 'rightToLeft', avatarLimit, align, ...rest } = props;

  return (
    <Popover
      trigger={
        <BoardTaskAssigneesPopoverTrigger
          assignees={props.assignees}
          direction={direction}
          avatarLimit={avatarLimit}
        />
      }
      className='flex flex-col w-80 h-[180px] gap-2'
      content={{ align: align ?? 'end' }}
    >
      <BoardTaskAssigneesPopoverContent {...rest} />
    </Popover>
  );
}
