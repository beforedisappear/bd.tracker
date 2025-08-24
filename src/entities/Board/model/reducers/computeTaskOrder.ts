import { DEFAULT_TASK_ORDER_GAP } from '../../constants';
import { getColumnByTaskId } from './getColumnByTaskId';
import { getTaskByTaskId } from './getTaskByTaskId';
import { getIndexById } from './getIndexById';
import { calculateOrder } from './calculateOrder';

import type { Column, Task } from '../types';

type Args1 = {
  columns: Column[];
  overColumnId: string;
  activeTaskId: string;
};

export function computeMovedTaskOnColumnOrder(args: Args1) {
  const { columns, overColumnId, activeTaskId } = args;

  const overColumn = columns.find(column => column.id === overColumnId);

  if (!overColumn) return;

  //последняя задача в колонке (не перетаскиваемая)
  const lastTaskInOverColumn: Task | null =
    overColumn.tasks.filter(task => task.id !== activeTaskId).at(-1) ?? null;

  //перетаскиваемый элемент - задача, принимающий элемент - колонка
  //если в колонке есть задачи, находим последнюю и передаем ее order + DEFAULT_TASK_ORDER_GAP
  //иначе колонка пустая и передаем DEFAULT_TASK_ORDER_GAP
  const computedOrder = lastTaskInOverColumn
    ? lastTaskInOverColumn.order + DEFAULT_TASK_ORDER_GAP
    : DEFAULT_TASK_ORDER_GAP;

  const activeTask = overColumn.tasks.find(task => task.id === activeTaskId);

  // если задача перемещается на месте
  if (
    activeTask &&
    activeTask.order === computedOrder &&
    activeTask.columnId === overColumnId
  ) {
    return;
  }

  return computedOrder;
}

type Args2 = {
  columns: Column[];
  overTaskId: string;
  activeTaskId: string;
};
export function computeMovedTaskOnTaskOrder(args: Args2) {
  const { columns, overTaskId, activeTaskId } = args;

  const overColumn = getColumnByTaskId(columns, overTaskId);

  if (!overColumn) return;

  const newActiveTask = getTaskByTaskId(overColumn.tasks, activeTaskId);

  if (!newActiveTask) return;

  const newActiveTaskIdx = getIndexById(overColumn.tasks, newActiveTask.id);

  const beforeTask = overColumn.tasks[newActiveTaskIdx - 1];
  const afterTask = overColumn.tasks[newActiveTaskIdx + 1];

  const computedOrder = calculateOrder({
    type: 'task',
    prev: beforeTask?.order,
    next: afterTask?.order,
  });

  // если задача перемещается на месте
  if (
    newActiveTask.order === computedOrder &&
    newActiveTask.columnId === overColumn.id
  ) {
    return;
  }

  return {
    order: computedOrder,
    overColumnId: overColumn.id,
  };
}
