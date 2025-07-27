import { ViewBoardColumn } from '../ViewBoardColumn/ViewBoardColumn';
import { ViewBoardTask } from '../ViewBoardTask/ViewBoardTask';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { customCollisionDetection } from '../../lib/customCollisionDetection';
import { useDragAndDropBoardItems } from '../../lib/useDragAndDropBoardItems';
import { useMemo } from 'react';
import { useDebounce } from '@/shared/lib/ui';

import type { Board, Column, Task } from '@/entities/Board';

interface MapColumnsAndTasksById {
  columns: Record<string, Column>;
  tasks: Record<string, Task>;
}

interface Props {
  board: Board;
}

export function ViewBoard(props: Props) {
  const { board } = props;

  const {
    columns,
    activeDraggableItem,
    isMovingColumn,
    isMovingTask,
    handleDragStart,
    handleDragOver,
    handleDragMove,
    handleDragEnd,
  } = useDragAndDropBoardItems({ board });

  const { setNodeRef } = useDroppable({ id: board.id });
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, //to support clicks
      disabled: isMovingColumn || isMovingTask,
    }),
  );

  const debouncedHandleDragMove = useDebounce(handleDragMove, 25);

  const mapColumnsAndTasksById: MapColumnsAndTasksById = useMemo(() => {
    return columns.reduce(
      (acc, column) => {
        acc.columns[column.id] = column;

        column.tasks.forEach(task => {
          acc.tasks[task.id] = task;
        });

        return acc;
      },
      { columns: {}, tasks: {} } as MapColumnsAndTasksById,
    );
  }, [columns]);

  if (board.columns.length === 0) return null;

  const sortableColumnIds = Object.keys(mapColumnsAndTasksById.columns);
  const sortableTaskIds = Object.keys(mapColumnsAndTasksById.tasks);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={customCollisionDetection}
      onDragStart={handleDragStart}
      onDragMove={debouncedHandleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sortableColumnIds}
        strategy={horizontalListSortingStrategy}
      >
        <div className='flex gap-4 h-full' ref={setNodeRef}>
          {columns.map(column => (
            <ViewBoardColumn
              key={column.id}
              data={column}
              sortableTaskIds={sortableTaskIds}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeDraggableItem && activeDraggableItem.type === 'Column' && (
          <ViewBoardColumn
            data={mapColumnsAndTasksById.columns[activeDraggableItem.id]}
            sortableTaskIds={sortableTaskIds}
          />
        )}

        {activeDraggableItem && activeDraggableItem.type === 'Task' && (
          <ViewBoardTask
            data={mapColumnsAndTasksById.tasks[activeDraggableItem.id]}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
