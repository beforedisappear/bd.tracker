import { getIndexById } from './getIndexById';
import { calculateOrder } from './calculateOrder';
import { getColumnByColumnId } from './getColumnByColumnId';

import type { Column } from '../types';

type Args = {
  columns: Column[];
  activeColumnId: string;
  overColumnId: string;
  length: number;
};

export function computeColumnOrder(args: Args) {
  const { columns, activeColumnId, overColumnId, length } = args;

  const overColumn = getColumnByColumnId(columns, overColumnId);

  if (!overColumn) return;

  let newOrder = 0;
  const newActiveColumnIdx = getIndexById(columns, activeColumnId);

  if (newActiveColumnIdx === 0) {
    newOrder = calculateOrder({ type: 'column', next: overColumn.order });
  } else if (newActiveColumnIdx === length - 1) {
    newOrder = calculateOrder({ type: 'column', prev: overColumn.order });
  } else {
    const prevColumn = columns[newActiveColumnIdx - 1]!;
    const nextColumn = columns[newActiveColumnIdx + 1]!;

    newOrder = calculateOrder({
      type: 'column',
      prev: prevColumn.order,
      next: nextColumn.order,
    });
  }

  return newOrder;
}
