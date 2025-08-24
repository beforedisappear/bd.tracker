import { arrayMove } from '@dnd-kit/sortable';
import { getColumnByTaskId } from './getColumnByTaskId';
import { getIndexById } from './getIndexById';

import type { Column } from '../types';

type Args = {
  columns: Column[];
  activeTaskId: string;
  overTaskId: string;
};

export function moveTaskOnTask({ columns, activeTaskId, overTaskId }: Args) {
  const activeColumn = getColumnByTaskId(columns, activeTaskId);

  const overColumn = getColumnByTaskId(columns, overTaskId);

  if (!activeColumn || !overColumn) return;

  const activeColumnIdx = getIndexById(columns, activeColumn.id);

  const overColumnIdx = getIndexById(columns, overColumn.id);

  const activeTaskIdx = getIndexById(activeColumn.tasks, activeTaskId);

  const overTaskIdx = getIndexById(overColumn.tasks, overTaskId);

  let newColumns: Column[] = [];

  // перемещение внутри той же колонки
  if (activeColumnIdx === overColumnIdx) {
    newColumns = [...columns];

    newColumns[activeColumnIdx]!.tasks = arrayMove(
      newColumns[activeColumnIdx]!.tasks,
      activeTaskIdx,
      overTaskIdx,
    );
  }
  // перемещение в другую колонку
  else {
    newColumns = [...columns];

    const [removedTask] = newColumns[activeColumnIdx]!.tasks.splice(
      activeTaskIdx,
      1,
    );

    newColumns[overColumnIdx]!.tasks.splice(overTaskIdx, 0, removedTask!);
  }

  return newColumns;
}
