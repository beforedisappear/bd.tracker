'use client';

import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/error';

import { columnQueries, taskQueries } from '../api';
import type {
  Over,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { isTypeActive } from './isTypeActive';
import { isTypeOver } from './isTypeOver';
import {
  DraggableItemObj,
  IsDraggableItem,
  type Column,
  type Board,
} from '../model/types';

import { moveTaskOnTask } from '../model/reducers/moveTaskOnTask';
import { moveTaskOnColumn } from '../model/reducers/moveTaskOnColumn';
import { moveColumnOnColumn } from '../model/reducers/moveColumnOnColumn';
import { computeColumnOrder } from '../model/reducers/computeColumnOrder';
import {
  computeMovedTaskOnColumnOrder,
  computeMovedTaskOnTaskOrder,
} from '../model/reducers/computeTaskOrder';

type Args = { board: Board };

export function useDndBoard(args: Args) {
  const { board } = args;

  const [columns, setColumns] = useState(board.columns);
  const [activeDraggableItem, setActiveDraggableItem] =
    useState<DraggableItemObj | null>(null);

  const lastValidOver = useRef<Over>(null);
  const lastValidColumns = useRef<Column[]>(null); // для сохранения состояния columns перед мутацией

  useEffect(() => {
    setColumns(board.columns);
  }, [board.columns]);

  const { mutateAsync: moveColumn, isPending: isMovingColumn } = useMutation(
    columnQueries.moveColumn(),
  );

  const { mutateAsync: moveTask, isPending: isMovingTask } = useMutation(
    taskQueries.moveTask(),
  );

  // Назначем перетаскиваемый элемент
  const handleDragStart = (event: DragStartEvent) => {
    if (isMovingColumn || isMovingTask) return;

    if (!IsDraggableItem(event.active.data.current?.type)) return;

    setActiveDraggableItem({
      id: event.active.id as string,
      type: event.active.data.current.type,
    });
  };

  // Определяем последний валидный принимающий элемент
  const handleDragOver = (event: DragOverEvent) => {
    if (isMovingColumn || isMovingTask) return;

    const { active, over } = event;

    if (!over || over.id === active.id) return;

    // если перетаскиваемый элемент - колонка, то не обрабатываем
    if (activeDraggableItem?.type === 'Column') return;

    if (over.id === lastValidOver.current?.id) return;

    lastValidOver.current = over;
  };

  // Обрабатываем перемещение для задач
  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    if (isMovingColumn || isMovingTask || !over || over.id === active.id)
      return;

    const isTaskActive = isTypeActive(active, 'Task'); // перетаскиваемый элемент - задача
    const isTaskOver = isTypeOver(over, 'Task'); // принимающий элемент - задача
    const isColumnOver = isTypeOver(over, 'Column'); // принимающий элемент - колонка

    const activeId = active.id as string;
    const overId = over.id as string;

    if (isTaskActive && isTaskOver) {
      const newColumns = moveTaskOnTask({
        columns,
        activeTaskId: activeId,
        overTaskId: overId,
      });

      if (!newColumns) return;

      lastValidColumns.current = columns;
      setColumns(newColumns);
    }

    if (isTaskActive && isColumnOver) {
      const newColumns = moveTaskOnColumn({
        columns,
        activeTaskId: activeId,
        overColumnId: overId,
      });

      if (!newColumns) return;

      lastValidColumns.current = columns;
      setColumns(newColumns);
    }
  };

  // Обрабатываем перемещение для колонок и делаем запросы на изменение веса
  const handleDragEnd = (event: DragEndEvent) => {
    if (isMovingColumn || isMovingTask) return;

    const { active, over } = event;

    if (!over) return;

    // если перетаскиваемый элемент - колонка и он перемещается на свое место, то не обрабатываем
    if (activeDraggableItem?.type === 'Column' && active.id === over.id) {
      setActiveDraggableItem(null);
      return;
    }

    const isTaskActive = isTypeActive(active, 'Task'); // перетаскиваемый элемент - задача
    const isColumnActive = isTypeActive(active, 'Column'); // перетаскиваемый элемент - колонка
    const isColumnOver = isTypeOver(over, 'Column'); // принимающий элемент - колонка
    // для таски active.id всегда равен over.id, поэтому ориентируемся на lastValidOver
    const isColumnOverLastOver = isTypeOver(lastValidOver.current, 'Column');
    const isTaskOverLastOver = isTypeOver(lastValidOver.current, 'Task');

    const activeId = active.id as string;
    const overId = over.id as string;

    if (isColumnActive && isColumnOver) {
      const newColumns = moveColumnOnColumn({
        columns,
        activeColumnId: activeId,
        overColumnId: overId,
      });

      if (!newColumns) return;

      setColumns(newColumns);

      const newOrder = computeColumnOrder({
        columns: newColumns,
        activeColumnId: activeId,
        overColumnId: overId,
        length: columns.length,
      });

      if (!newOrder) return;

      const dto = {
        boardId: board.id,
        columnId: activeId,
        order: newOrder,
      };

      moveColumn(dto)
        .catch(e => {
          setColumns(lastValidColumns.current!);
          toast.error(getErrorMessage(e));
        })
        .finally(() => setActiveDraggableItem(null));

      return;
    }

    if (isTaskActive && isColumnOverLastOver) {
      const overColumnId = lastValidOver.current!.id as string;

      const newOrder = computeMovedTaskOnColumnOrder({
        columns,
        activeTaskId: activeId,
        overColumnId,
      });

      if (!newOrder) return;

      const dto = {
        id: activeId,
        columnId: overColumnId,
        boardId: board.id,
        order: newOrder,
      };

      moveTask(dto)
        .catch(e => {
          setColumns(lastValidColumns.current!);
          toast.error(getErrorMessage(e));
        })
        .finally(() => setActiveDraggableItem(null));

      return;
    }

    if (isTaskActive && isTaskOverLastOver) {
      const overTaskId = lastValidOver.current!.id as string;

      const res = computeMovedTaskOnTaskOrder({
        columns,
        activeTaskId: activeId,
        overTaskId,
      });

      if (!res) return;

      const dto = {
        id: activeId,
        columnId: res.overColumnId,
        boardId: board.id,
        order: res.order,
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

  const getDndProps = () => ({
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd,
  });

  return {
    columns,
    activeDraggableItem,
    isMovingColumn,
    isMovingTask,
    getDndProps,
  };
}
