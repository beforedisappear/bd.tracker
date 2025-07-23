import { Popover, type PopoverContentProps } from '@/shared/ui/c';
import { BoardAssigneesPopoverContent } from '../BoardAssigneesPopoverContent/BoardAssigneesPopoverContent';
import { BoardAssigneesPopoverTrigger } from '../BoardAssigneesPopoverTrigger/BoardAssigneesPopoverTrigger';

import type { AssigneesPopoverTriggerDirection, Task } from '../../model/types';

interface Props {
  taskId: Task['id'];
  assignees: Task['assignees'];
  direction?: AssigneesPopoverTriggerDirection;
  avatarLimit?: number;
  align?: PopoverContentProps['align'];
  offAll?: boolean;
}

export function BoardAssigneesPopover(props: Props) {
  const { direction = 'rightToLeft', avatarLimit, align, ...rest } = props;

  return (
    <Popover
      trigger={
        <BoardAssigneesPopoverTrigger
          assignees={props.assignees}
          direction={direction}
          avatarLimit={avatarLimit}
        />
      }
      className='flex flex-col w-80 h-[180px] gap-2'
      content={{ align: align ?? 'end' }}
    >
      <BoardAssigneesPopoverContent {...rest} />
    </Popover>
  );
}
