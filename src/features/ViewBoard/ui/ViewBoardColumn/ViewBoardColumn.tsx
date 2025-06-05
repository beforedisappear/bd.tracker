import { PlusCircle } from 'lucide-react';

import { Button } from '@/shared/ui/c';
import { ViewBoardTask } from '../ViewBoardTask/ViewBoardTask';
import { ViewBoardColumnMenu } from '../ViewBoardColumnMenu/ViewBoardColumnMenu';

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

        <Button
          variant={null}
          className='mt-3 w-full justify-start text-muted-foreground'
        >
          <PlusCircle className='mr-2 h-4 w-4' />
          <span>Добавить задачу</span>
        </Button>
      </div>
    </div>
  );
}
