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
  sortableTaskIds: string[];
  isOverlay?: boolean;
}

// TODO: add SCROLL AREA
export function ViewBoardColumn(props: Props) {
  const {
    data: { id, name, tasks },
    sortableTaskIds,
  } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { type: 'Column', id } });

  return (
    <div
      className={cn(getColumnClassName(), {
        'opacity-45': isDragging,
      })}
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
    </div>
  );
}
