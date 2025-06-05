import { ViewBoardTask } from '../ViewBoardTask/ViewBoardTask';
import { ViewBoardColumnMenu } from '../ViewBoardColumnMenu/ViewBoardColumnMenu';
import { ViewBoardColumnCreateTaskBtn } from '../ViewBoardColumnCreateTaskBtn/ViewBoardColumnCreateTaskBtn';

import type { Column } from '@/entities/Board';
interface Props {
  data: Column;
}

// TODO: add SCROLL AREA
export function ViewBoardColumn(props: Props) {
  const {
    data: { id, name, tasks },
  } = props;

  return (
    <div className={`flex-shrink-0 w-80`}>
      <div className={`flex flex-col h-auto gap-2 p-4 bg-muted rounded-lg`}>
        <div className='flex justify-between items-center mb-4'>
          <p className='font-medium text-lg'>{name}</p>
          <div className='flex items-center gap-2'>
            <ViewBoardColumnMenu columnId={id} />

            <span className='bg-primary/10 text-primary px-2 py-1 rounded-full text-sm'>
              {tasks.length}
            </span>
          </div>
        </div>

        {tasks.map(task => (
          <ViewBoardTask key={task.id} data={task} />
        ))}

        <ViewBoardColumnCreateTaskBtn />
      </div>
    </div>
  );
}
