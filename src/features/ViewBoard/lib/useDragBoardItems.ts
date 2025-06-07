import { arrayMove } from '@dnd-kit/sortable';
import { useState, RefObject } from 'react';
import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/error';
import {
  columnQueries,
  taskQueries,
  type Column,
  type Task,
  type Board,
} from '@/entities/Board';
import { type DraggableItemObj, IsDraggableItem } from '../model/types';
import type {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  Over,
} from '@dnd-kit/core';

type Args = {
  board: Board;
  columns: Column[];
  lastValidColumns: RefObject<Column[] | null>;
  lastValidOver: RefObject<Over | null>;
  setColumns: (columns: Column[]) => void;
};

export function useDragBoardItems(args: Args) {
  const { board, lastValidOver, lastValidColumns } = args;

  const [columns, setColumns] = useState(board.columns);

  const { mutateAsync: moveColumn, isPending: isMovingColumn } = useMutation(
    columnQueries.moveColumn(),
  );

  const { mutateAsync: moveTask, isPending: isMovingTask } = useMutation(
    taskQueries.moveTask(),
  );

  const [activeDraggableItem, setActiveDraggableItem] =
    useState<DraggableItemObj | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    if (!IsDraggableItem(event.active.data.current?.type)) return;

    setActiveDraggableItem({
      id: event.active.id as string,
      type: event.active.data.current.type,
    });
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (over.id === active.id) return;

    if (activeDraggableItem?.type === 'Column') return;

    if (over.id === lastValidOver.current?.id) return;

    lastValidOver.current = over;
  };

  // only for tasks
  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    if (isMovingColumn || isMovingTask) return;

    if (!over || over.id === active.id) return;

    const isTaskActive = active.data.current?.type === 'Task'; // перетаскиваемый элемент - задача
    const isTaskOver = over.data.current?.type === 'Task'; // принимающий элемент - задача
    const isColumnOver = over.data.current?.type === 'Column'; // принимающий элемент - колонка

    if (isTaskActive && isTaskOver) {
      const sourceColumn = columns.find(column =>
        column.tasks.some(task => task.id === active.id),
      );

      const targetColumn = columns.find(column =>
        column.tasks.some(task => task.id === over.id),
      );

      if (!sourceColumn || !targetColumn) return;

      const sourceColumnIdx = columns.findIndex(
        column => column.id === sourceColumn.id,
      );

      const targetColumnIdx = columns.findIndex(
        column => column.id === targetColumn.id,
      );

      const sourceTaskIdx = sourceColumn.tasks.findIndex(
        task => task.id === active.id,
      );

      const targetTaskIdx = targetColumn.tasks.findIndex(
        task => task.id === over.id,
      );

      let newColumns = [];

      // в той же колонке
      if (sourceColumnIdx === targetColumnIdx) {
        newColumns = [...columns];

        newColumns[sourceColumnIdx].tasks = arrayMove(
          newColumns[sourceColumnIdx].tasks,
          sourceTaskIdx,
          targetTaskIdx,
        );
      }
      // в другую колонку
      else {
        newColumns = [...columns];

        const [removedTask] = newColumns[sourceColumnIdx].tasks.splice(
          sourceTaskIdx,
          1,
        );

        newColumns[targetColumnIdx].tasks.splice(targetTaskIdx, 0, removedTask);
      }

      lastValidColumns.current = columns;
      setColumns(newColumns);
    }

    if (isTaskActive && isColumnOver) {
      const sourceColumn = columns.find(column =>
        column.tasks.some(task => task.id === active.id),
      );

      const targetColumn = columns.find(column => column.id === over.id);

      if (!sourceColumn || !targetColumn) return;

      const sourceColumnIdx = columns.findIndex(
        column => column.id === sourceColumn.id,
      );

      const targetColumnIdx = columns.findIndex(
        column => column.id === targetColumn.id,
      );

      const sourceTaskIdx = sourceColumn.tasks.findIndex(
        task => task.id === active.id,
      );

      const newColumns = [...columns];

      const [removedTask] = newColumns[sourceColumnIdx].tasks.splice(
        sourceTaskIdx,
        1,
      );

      newColumns[targetColumnIdx].tasks.push(removedTask);

      lastValidColumns.current = columns;
      setColumns(newColumns);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (isMovingColumn || isMovingTask) return;

    const { active, over } = event;

    if (!over) return;

    const isTaskActive = active.data.current?.type === 'Task'; // перетаскиваемый элемент - задача
    const isColumnOver = over.data.current?.type === 'Column'; // принимающий элемент - колонка
    const isColumnActive = active.data.current?.type === 'Column'; // перетаскиваемый элемент - колонка

    if (isColumnActive && isColumnOver) {
      const oldColumnIdx = columns.findIndex(column => column.id === active.id);
      const newColumnIdx = columns.findIndex(column => column.id === over.id);

      const isBefore = newColumnIdx < oldColumnIdx;

      const newColumns = arrayMove(columns, oldColumnIdx, newColumnIdx);

      setColumns(newColumns);

      const dto = isBefore
        ? {
            columnId: active.id as string,
            nextColumnId: over.id as string,
            previousColumnId: null,
          }
        : {
            columnId: active.id as string,
            nextColumnId: null,
            previousColumnId: over.id as string,
          };

      moveColumn(dto)
        .catch(e => {
          setColumns(lastValidColumns.current!);
          toast.error(getErrorMessage(e));
        })
        .finally(() => setActiveDraggableItem(null));

      return;
    }

    if (
      isTaskActive &&
      lastValidOver.current?.data.current?.type === 'Column'
    ) {
      const overColumnId = lastValidOver.current.id as string;

      const overColumn = columns.find(column => column.id === overColumnId);

      if (!overColumn) return;

      //последняя задача в колонке, не перетаскиваемая
      const lastTask: Task | null =
        overColumn.tasks.filter(task => task.id !== active.id).at(-1) ?? null;

      //перетаскиваемый элемент - задача, принимающий элемент - колонка
      //если в колонке есть задачи, находим последнюю и передаем ее id в качестве previousTaskId
      //иначе колонка пустая и оба параметра null
      const dto = {
        taskId: active.id as string,
        columnId: overColumnId,
        boardId: board.id,
        nextTaskId: null,
        previousTaskId: lastTask ? (lastTask.id as string) : null,
      };

      moveTask(dto)
        .catch(e => {
          setColumns(lastValidColumns.current!);
          toast.error(getErrorMessage(e));
        })
        .finally(() => setActiveDraggableItem(null));

      return;
    }

    if (isTaskActive && lastValidOver.current?.data.current?.type === 'Task') {
      const overTaskId = lastValidOver.current.id;

      const targetColumn = columns.find(column =>
        column.tasks.some(task => task.id === overTaskId),
      );

      if (!targetColumn) return;

      const newActiveTaskIdx = targetColumn.tasks.findIndex(
        task => task.id === active.id,
      );

      const newOverTaskIdx = targetColumn.tasks.findIndex(
        task => task.id === overTaskId,
      );

      const dto = {
        taskId: active.id as string,
        columnId: targetColumn.id,
        boardId: board.id,
        ...(newActiveTaskIdx <= newOverTaskIdx
          ? {
              nextTaskId: overTaskId as string,
              previousTaskId: null,
            }
          : {
              nextTaskId: null,
              previousTaskId: overTaskId as string,
            }),
      };

      moveTask(dto)
        .catch(e => {
          setColumns(lastValidColumns.current!);
          toast.error(getErrorMessage(e));
        })
        .finally(() => setActiveDraggableItem(null));

      return;
    }
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDragMove,
    handleDragEnd,
  };
}
