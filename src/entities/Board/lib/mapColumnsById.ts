import type { Board, Column } from '../model/types';

export function mapColumnsById(board: Board): Record<string, Column> {
  return board.columns.reduce(
    (acc, column) => {
      acc[column.id] = column;
      return acc;
    },
    {} as Record<string, Column>,
  );
}
