import { getColumnByTaskId } from './getColumnByTaskId';
import { getColumnByColumnId } from './getColumnByColumnId';
import { getIndexById } from './getIndexById';

import type { Column } from '../types';

type Args = {
  columns: Column[];
  activeTaskId: string;
  overColumnId: string;
};

export function moveTaskOnColumn({
  columns,
  activeTaskId,
  overColumnId,
}: Args) {
  const activeColumn = getColumnByTaskId(columns, activeTaskId);

  const overColumn = getColumnByColumnId(columns, overColumnId);

  if (!activeColumn || !overColumn) return;

  const activeColumnIdx = getIndexById(columns, activeColumn.id);

  const overColumnIdx = getIndexById(columns, overColumn.id);

  const activeTaskIdx = getIndexById(activeColumn.tasks, activeTaskId);

  const newColumns = [...columns];

  const [removedTask] = newColumns[activeColumnIdx]!.tasks.splice(
    activeTaskIdx,
    1,
  );

  // помещаем задачу в конец колонки
  newColumns[overColumnIdx]!.tasks.push(removedTask!);

  return newColumns;
}
