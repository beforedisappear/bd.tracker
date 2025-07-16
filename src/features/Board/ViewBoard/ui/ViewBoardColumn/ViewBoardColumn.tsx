import { ScrollArea } from '@/shared/ui/c';
import { ViewBoardTask } from '../ViewBoardTask/ViewBoardTask';
import { ViewBoardColumnWrapper } from '../ViewBoardColumnWrapper/ViewBoardColumnWrapper';
import { ViewBoardColumnHeader } from '../ViewBoardColumnHeader/ViewBoardColumnHeader';
import { ViewBoardColumnCreateTaskBtn } from '../ViewBoardColumnCreateTaskBtn/ViewBoardColumnCreateTaskBtn';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import type { Column } from '@/entities/Board';

interface Props {
  data: Column;
  sortableTaskIds: string[];
}

export function ViewBoardColumn(props: Props) {
  const {
    data: { id, name, tasks },
    sortableTaskIds,
  } = props;

  return (
    <ViewBoardColumnWrapper id={id}>
      <div className='flex flex-col h-auto gap-2 p-4 bg-muted rounded-lg'>
        <ViewBoardColumnHeader
          columnId={id}
          name={name}
          length={tasks.length}
        />

        <SortableContext
          items={sortableTaskIds}
          strategy={verticalListSortingStrategy}
        >
          <ScrollArea
            type='always'
            className='mr-[-0.75rem]'
            scrollBar={{
              thumbClassName: 'bg-zinc-300 dark:bg-zinc-700',
              ['data-drag']: false,
            }}
          >
            {/* FIXME: высчитывать 350px из констант */}
            <div className='flex flex-col gap-2 h-full pr-3 max-h-[calc(100vh-350px)]'>
              {tasks.map(task => (
                <ViewBoardTask key={task.id} data={task} />
              ))}
            </div>
          </ScrollArea>
        </SortableContext>

        <ViewBoardColumnCreateTaskBtn columnId={id} />
      </div>
    </ViewBoardColumnWrapper>
  );
}
