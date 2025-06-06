import { ViewBoardColumn } from '../ViewBoardColumn/ViewBoardColumn';

import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import {
  DndContext,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  DragEndEvent,
  closestCenter,
} from '@dnd-kit/core';
import { useState } from 'react';

import { columnQueries, taskQueries, type Board } from '@/entities/Board';
import { useMutation } from '@tanstack/react-query';
import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';

interface Props {
  board: Board;
}

export function ViewBoard(props: Props) {
  const { board } = props;

  const { mutateAsync: moveColumn, isPending: isMovingColumn } = useMutation(
    columnQueries.moveColumn(),
  );

  const { mutateAsync: moveTask, isPending: isMovingTask } = useMutation(
    taskQueries.moveTask(),
  );

  const [columns, setColumns] = useState(board.columns);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, //to support clicks
      },
      disabled: isMovingColumn || isMovingTask,
    }),
  );
  const { setNodeRef } = useDroppable({ id: board.id });

  if (board.columns.length === 0) return null;

  const handleDragEnd = (event: DragEndEvent) => {
    if (isMovingColumn || isMovingTask) return;

    const { active, over } = event;

    console.log(active, over);

    if (!over || over.id === active.id) return;

    if (over.data.current?.type === 'Column') {
      const oldColumnIdx = columns.findIndex(column => column.id === active.id);
      const newColumnIdx = columns.findIndex(column => column.id === over.id);

      const isBefore = newColumnIdx < oldColumnIdx;

      const newColumns = arrayMove(columns, oldColumnIdx, newColumnIdx);

      setColumns(newColumns);

      moveColumn(
        isBefore
          ? {
              columnId: active.id as string,
              nextColumnId: over.id as string,
              previousColumnId: null,
            }
          : {
              columnId: active.id as string,
              nextColumnId: null,
              previousColumnId: over.id as string,
            },
      ).catch(e => {
        setColumns(columns);
        toast.error(getErrorMessage(e));
      });
    }

    if (over.data.current?.type === 'Task') {
      console.log(over, active);

      const oldTaskIdx = columns.findIndex(column => column.id === active.id);
      const newTaskIdx = columns.findIndex(column => column.id === over.id);

      const isBefore = newTaskIdx < oldTaskIdx;
    }
  };

  const sortableColumnIds = columns.map(column => column.id);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sortableColumnIds}
        strategy={horizontalListSortingStrategy}
      >
        <div className='flex gap-4 h-full' ref={setNodeRef}>
          {columns.map(column => (
            <ViewBoardColumn key={column.id} data={column} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
