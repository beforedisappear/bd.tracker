import { arrayMove } from '@dnd-kit/sortable';
import { getColumnByColumnId } from './getColumnByColumnId';

import type { Column } from '../types';

type Args = {
  columns: Column[];
  activeColumnId: string;
  overColumnId: string;
};

export function moveColumnOnColumn(args: Args) {
  const { columns, activeColumnId, overColumnId } = args;

  const activeColumn = getColumnByColumnId(columns, activeColumnId);
  const overColumn = getColumnByColumnId(columns, overColumnId);

  if (!activeColumn || !overColumn) return;

  const activeColumnIdx = columns.indexOf(activeColumn);
  const overColumnIdx = columns.indexOf(overColumn);

  const newColumns = arrayMove(columns, activeColumnIdx, overColumnIdx);

  return newColumns;
}
