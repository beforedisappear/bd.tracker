import { ViewBoardTaskStickersMenu } from '../ViewBoardTaskStickersMenu/ViewBoardTaskStickersMenu';
import { ViewBoardAssigneesPopover } from '../ViewBoardAssigneesPopover/ViewBoardAssigneesPopover';
import { ViewBoardTaskDateRangeMenu } from '../ViewBoardTaskDateRangeMenu/ViewBoardTaskDateRangeMenu';

import type { Task } from '@/entities/Board';

interface Props {
  data: Task;
}

export function ViewBoardTaskContent(props: Props) {
  const { data } = props;

  return (
    <div className='flex gap-2 justify-between'>
      <div className='flex gap-2 flex-wrap'>
        <ViewBoardTaskStickersMenu taskId={data.id} stickers={data.stickers} />

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
