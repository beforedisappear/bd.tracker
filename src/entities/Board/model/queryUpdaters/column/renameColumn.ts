import type { GetBoardByIdDtoRes, RenameColumnDtoReq } from '../../types';

type Args = RenameColumnDtoReq;
type Cache = GetBoardByIdDtoRes;

export const renameColumnQueryUpdater =
  ({ id, name }: Args) =>
  (oldData: Cache) => ({
    ...oldData,
    columns: oldData.columns.map(column =>
      column.id === id ? { ...column, name } : column,
    ),
  });
