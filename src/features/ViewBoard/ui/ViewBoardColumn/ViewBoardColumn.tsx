import { ViewBoardTask } from '../ViewBoardTask/ViewBoardTask';
import { ViewBoardColumnHeader } from '../ViewBoardColumnHeader/ViewBoardColumnHeader';
import { ViewBoardColumnCreateTaskBtn } from '../ViewBoardColumnCreateTaskBtn/ViewBoardColumnCreateTaskBtn';

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import { getColumnClassName } from '../../lib/getColumnClassName';
import { cn } from '@/shared/lib/css';

import type { Column } from '@/entities/Board';
interface Props {
  data: Column;
}

// TODO: add SCROLL AREA
export function ViewBoardColumn(props: Props) {
  const {
    data: { id, name, tasks },
  } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, data: { type: 'Column', id } });

  const taskIds = tasks.map(task => task.id);

  return (
    <div
      className={cn('flex-shrink-0 w-80', getColumnClassName())}
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
    >
      <div className={`flex flex-col h-auto gap-2 p-4 bg-muted rounded-lg`}>
        <ViewBoardColumnHeader
          columnId={id}
          name={name}
          length={tasks.length}
        />

        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <ViewBoardTask key={task.id} data={task} />
          ))}
        </SortableContext>

        <ViewBoardColumnCreateTaskBtn columnId={id} />
      </div>
    </div>
  );
}
