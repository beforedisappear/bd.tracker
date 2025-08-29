import { BoardTaskAssigneesPopover } from '@/entities/Board';
import {
  BoardTaskDateRangeMenu,
  BoardTaskStickersMenu,
  type Task,
} from '@/entities/Board';

interface Props {
  data: Task;
}

export function ViewBoardTaskContent(props: Props) {
  const { data } = props;

  return (
    <div className='flex gap-2 justify-between'>
      <div className='flex gap-2 flex-wrap'>
        <BoardTaskStickersMenu taskId={data.id} stickers={data.stickers} />

        <BoardTaskDateRangeMenu
          taskId={data.id}
          startDate={data.startDate}
          endDate={data.endDate}
        />
      </div>

      <BoardTaskAssigneesPopover
        taskId={data.id}
        assignees={data.assignees}
        offAll
      />
    </div>
  );
}
