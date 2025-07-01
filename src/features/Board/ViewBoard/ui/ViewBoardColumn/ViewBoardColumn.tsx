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

// TODO: add SCROLL AREA
export function ViewBoardColumn(props: Props) {
  const {
    data: { id, name, tasks },
    sortableTaskIds,
  } = props;

  return (
    <ViewBoardColumnWrapper id={id}>
      <div className={`flex flex-col h-auto gap-2 p-4 bg-muted rounded-lg`}>
        <ViewBoardColumnHeader
          columnId={id}
          name={name}
          length={tasks.length}
        />

        <SortableContext
          items={sortableTaskIds}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map(task => (
            <ViewBoardTask key={task.id} data={task} />
          ))}
        </SortableContext>

        <ViewBoardColumnCreateTaskBtn columnId={id} />
      </div>
    </ViewBoardColumnWrapper>
  );
}
