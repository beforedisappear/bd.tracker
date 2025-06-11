import { ViewBoardTaskStickersMenu } from '../ViewBoardTaskStickersMenu/ViewBoardTaskStickersMenu';
import { ViewBoardAssigneesPopover } from '../ViewBoardAssigneesPopover/ViewBoardAssigneesPopover';

import type { Task } from '@/entities/Board';

interface Props {
  data: Task;
}

export function ViewBoardTaskContent(props: Props) {
  const { data } = props;

  return (
    <div className='flex gap-2 justify-between'>
      <ViewBoardTaskStickersMenu />

      <ViewBoardAssigneesPopover taskId={data.id} assignees={data.assignees} />
    </div>
  );
}
