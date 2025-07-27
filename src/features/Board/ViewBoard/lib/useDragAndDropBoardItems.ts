import { arrayMove } from '@dnd-kit/sortable';
import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';
import { isTypeActive } from './isTypeActive';
import { isTypeOver } from './isTypeOver';
import { getErrorMessage } from '@/shared/lib/error';
import {
  columnQueries,
  taskQueries,
  computeOrder,
  DEFAULT_TASK_ORDER_GAP,
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

type Args = { board: Board };

export function useDragAndDropBoardItems(args: Args) {
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

    if (isColumnActive && isColumnOver) {
      const activeColumn = columns.find(column => column.id === active.id);
      const overColumn = columns.find(column => column.id === over.id);

      if (!activeColumn || !overColumn) return;

      const activeColumnIdx = columns.indexOf(activeColumn);
      const overColumnIdx = columns.indexOf(overColumn);

      const newColumns = arrayMove(columns, activeColumnIdx, overColumnIdx);

      setColumns(newColumns);

      let newOrder = 0;
      const newActiveColumnIdx = newColumns.indexOf(activeColumn);

      if (newActiveColumnIdx === 0) {
        newOrder = computeOrder({ type: 'column', next: overColumn.order });
      } else if (newActiveColumnIdx === columns.length - 1) {
        newOrder = computeOrder({ type: 'column', prev: overColumn.order });
      } else {
        const prevColumn = newColumns[newActiveColumnIdx - 1];
        const nextColumn = newColumns[newActiveColumnIdx + 1];

        newOrder = computeOrder({
          type: 'column',
          prev: prevColumn.order,
          next: nextColumn.order,
        });
      }

      const dto = {
        boardId: board.id,
        columnId: active.id as string,
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

      const overColumn = columns.find(column => column.id === overColumnId);

      if (!overColumn) return;

      //последняя задача в колонке (не перетаскиваемая)
      const lastTaskInOverColumn: Task | null =
        overColumn.tasks.filter(task => task.id !== active.id).at(-1) ?? null;

      const activeTask = overColumn.tasks.find(task => task.id === active.id);

      //перетаскиваемый элемент - задача, принимающий элемент - колонка
      //если в колонке есть задачи, находим последнюю и передаем ее order + DEFAULT_TASK_ORDER_GAP
      //иначе колонка пустая и передаем DEFAULT_TASK_ORDER_GAP
      const dto = {
        id: active.id as string,
        columnId: overColumnId,
        boardId: board.id,
        order: lastTaskInOverColumn
          ? lastTaskInOverColumn.order + DEFAULT_TASK_ORDER_GAP
          : DEFAULT_TASK_ORDER_GAP,
      };

      // если задача перемещается на месте
      if (
        activeTask &&
        activeTask.order === dto.order &&
        activeTask.columnId === dto.columnId
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

    if (isTaskActive && isTaskOverLastOver) {
      const overTaskId = lastValidOver.current!.id;

      const overColumn = columns.find(column =>
        column.tasks.some(task => task.id === overTaskId),
      );

      if (!overColumn) return;

      const newActiveTask = overColumn.tasks.find(
        task => task.id === active.id,
      );

      if (!newActiveTask) return;

      const newActiveTaskIdx = overColumn.tasks.indexOf(newActiveTask);

      const beforeTask = overColumn.tasks[newActiveTaskIdx - 1] as
        | Task
        | undefined;
      const afterTask = overColumn.tasks[newActiveTaskIdx + 1] as
        | Task
        | undefined;

      const computedOrder = computeOrder({
        type: 'task',
        prev: beforeTask?.order,
        next: afterTask?.order,
      });

      console.log('computedOrder', computedOrder);

      const dto = {
        id: active.id as string,
        columnId: overColumn.id,
        boardId: board.id,
        order: computedOrder,
      };

      // если задача перемещается на месте
      if (
        newActiveTask.order === dto.order &&
        newActiveTask.columnId === dto.columnId
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
