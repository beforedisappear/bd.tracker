import { restoreOrder } from './restoreOrder';
import type { Board } from '@/entities/Board';

export const normalizeBoardData = (res: Board) => ({
  ...res,
  columns: restoreOrder(res.columns).map(column => ({
    ...column,
    tasks: restoreOrder(column.tasks),
  })),
});
