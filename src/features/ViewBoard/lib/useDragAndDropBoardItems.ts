import { arrayMove } from '@dnd-kit/sortable';
import { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';
import { isTypeActive } from './isTypeActive';
import { isTypeOver } from './isTypeOver';
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
  Over,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';

type Args = {
  board: Board;
};

export function useDragAndDropBoardItems(args: Args) {
  const { board } = args;

  const [columns, setColumns] = useState(board.columns);
  const [activeDraggableItem, setActiveDraggableItem] =
    useState<DraggableItemObj | null>(null);

  const lastValidOver = useRef<Over>(null);
  const lastValidColumns = useRef<Column[]>(null); // для сохранения состояния columns перед мутацией

  const { mutateAsync: moveColumn, isPending: isMovingColumn } = useMutation(
    columnQueries.moveColumn(),
  );

  const { mutateAsync: moveTask, isPending: isMovingTask } = useMutation(
    taskQueries.moveTask(),
  );

  const handleDragStart = (event: DragStartEvent) => {
    if (!IsDraggableItem(event.active.data.current?.type)) return;

    setActiveDraggableItem({
      id: event.active.id as string,
      type: event.active.data.current.type,
    });
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || over.id === active.id) return;

    if (activeDraggableItem?.type === 'Column') return;

    if (over.id === lastValidOver.current?.id) return;

    lastValidOver.current = over;
  };

  // only for tasks
  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    if (isMovingColumn || isMovingTask || !over || over.id === active.id)
      return;

    const isTaskActive = isTypeActive(active, 'Task'); // перетаскиваемый элемент - задача
    const isTaskOver = isTypeOver(over, 'Task'); // принимающий элемент - задача
    const isColumnOver = isTypeOver(over, 'Column'); // принимающий элемент - колонка

    if (isTaskActive && isTaskOver) {
      const activeColumn = columns.find(column =>
        column.tasks.some(task => task.id === active.id),
      );

      const overColumn = columns.find(column =>
        column.tasks.some(task => task.id === over.id),
      );

      if (!activeColumn || !overColumn) return;

      const activeColumnIdx = columns.findIndex(
        column => column.id === activeColumn.id,
      );

      const overColumnIdx = columns.findIndex(
        column => column.id === overColumn.id,
      );

      const activeTaskIdx = activeColumn.tasks.findIndex(
        task => task.id === active.id,
      );

      const overTaskIdx = overColumn.tasks.findIndex(
        task => task.id === over.id,
      );

      let newColumns = [];

      // в той же колонке
      if (activeColumnIdx === overColumnIdx) {
        newColumns = [...columns];

        newColumns[activeColumnIdx].tasks = arrayMove(
          newColumns[activeColumnIdx].tasks,
          activeTaskIdx,
          overTaskIdx,
        );
      }
      // в другую колонку
      else {
        newColumns = [...columns];

        const [removedTask] = newColumns[activeColumnIdx].tasks.splice(
          activeTaskIdx,
          1,
        );

        newColumns[overColumnIdx].tasks.splice(overTaskIdx, 0, removedTask);
      }

      lastValidColumns.current = columns;
      setColumns(newColumns);
    }

    if (isTaskActive && isColumnOver) {
      const activeColumn = columns.find(column =>
        column.tasks.some(task => task.id === active.id),
      );

      const overColumn = columns.find(column => column.id === over.id);

      if (!activeColumn || !overColumn) return;

      const activeColumnIdx = columns.findIndex(
        column => column.id === activeColumn.id,
      );

      const overColumnIdx = columns.findIndex(
        column => column.id === overColumn.id,
      );

      const activeTaskIdx = activeColumn.tasks.findIndex(
        task => task.id === active.id,
      );

      const newColumns = [...columns];

      const [removedTask] = newColumns[activeColumnIdx].tasks.splice(
        activeTaskIdx,
        1,
      );

      newColumns[overColumnIdx].tasks.push(removedTask);

      lastValidColumns.current = columns;
      setColumns(newColumns);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (isMovingColumn || isMovingTask) return;

    const { active, over } = event;

    if (!over) return;

    if (activeDraggableItem?.type === 'Column' && active.id === over.id) {
      setActiveDraggableItem(null);
      return;
    }

    const isTaskActive = isTypeActive(active, 'Task'); // перетаскиваемый элемент - задача
    const isColumnActive = isTypeActive(active, 'Column'); // перетаскиваемый элемент - колонка
    const isColumnOver = isTypeOver(over, 'Column'); // принимающий элемент - колонка

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

    // для таски active.id всегда равен over.id, поэтому ориентируемся на lastValidOver

    if (isTaskActive && isTypeOver(lastValidOver.current, 'Column')) {
      const overColumnId = lastValidOver.current!.id as string;

      const overColumn = columns.find(column => column.id === overColumnId);

      if (!overColumn) return;

      //последняя задача в колонке, не перетаскиваемая
      const lastTaskInOverColumn: Task | null =
        overColumn.tasks.filter(task => task.id !== active.id).at(-1) ?? null;

      const activeTask = overColumn.tasks.find(task => task.id === active.id);

      //перетаскиваемый элемент - задача, принимающий элемент - колонка
      //если в колонке есть задачи, находим последнюю и передаем ее id в качестве previousTaskId
      //иначе колонка пустая и оба параметра null
      const dto = {
        taskId: active.id as string,
        columnId: overColumnId,
        boardId: board.id,
        nextTaskId: null,
        previousTaskId: lastTaskInOverColumn
          ? (lastTaskInOverColumn.id as string)
          : null,
      };

      // если задача перемещается в той же колонке
      if (
        activeTask &&
        activeTask.columnId === dto.columnId &&
        !dto.nextTaskId &&
        !dto.previousTaskId
      ) {
        setActiveDraggableItem(null);
        return;
      }

      moveTask(dto)
        .catch(e => {
          setColumns(lastValidColumns.current!);
          toast.error(getErrorMessage(e));
        })
        .finally(() => setActiveDraggableItem(null));

      return;
    }

    if (isTaskActive && isTypeOver(lastValidOver.current, 'Task')) {
      const overTaskId = lastValidOver.current!.id;

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
    columns,
    activeDraggableItem,
    isMovingColumn,
    isMovingTask,
    handleDragStart,
    handleDragOver,
    handleDragMove,
    handleDragEnd,
  };
}
