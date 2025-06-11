import { ViewBoardTaskStickersMenu } from '../ViewBoardTaskStickersMenu/ViewBoardTaskStickersMenu';
import { ViewBoardAssigneesPopover } from '../ViewBoardAssigneesPopover/ViewBoardAssigneesPopover';

import type { Task } from '@/entities/Board';
import { ViewBoardTaskDateRangeMenu } from '../ViewBoardTaskDateRangeMenu/ViewBoardTaskDateRangeMenu';

interface Props {
  data: Task;
}

export function ViewBoardTaskContent(props: Props) {
  const { data } = props;

  return (
    <div className='flex gap-2 justify-between'>
      <div className='flex gap-2 flex-wrap'>
        <ViewBoardTaskStickersMenu />
        <ViewBoardTaskDateRangeMenu
          taskId={data.id}
          startDate={data.startDate}
          endDate={data.endDate}
        />
      </div>

      <ViewBoardAssigneesPopover taskId={data.id} assignees={data.assignees} />
    </div>
  );
}
