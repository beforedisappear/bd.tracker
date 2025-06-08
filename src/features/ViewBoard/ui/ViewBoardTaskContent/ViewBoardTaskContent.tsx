import type { Task } from '@/entities/Board';
import { ViewBoardTaskStickersMenu } from '../ViewBoardTaskStickersMenu/ViewBoardTaskStickersMenu';

interface Props {
  data: Task;
}

export function ViewBoardTaskContent(props: Props) {
  const { data } = props;

  return (
    <div className='flex'>
      <ViewBoardTaskStickersMenu />
    </div>
  );
}
