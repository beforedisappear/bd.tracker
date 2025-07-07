import type { GetBoardByIdDtoRes, RenameColumnDtoReq } from '../../types';

type Args = RenameColumnDtoReq;
type Cache = GetBoardByIdDtoRes;

export const renameColumnQueryUpdater =
  ({ id, name, boardId }: Args) =>
  (oldData: Cache) => {
    if (boardId !== oldData.id) return oldData;

    return {
      ...oldData,
      columns: oldData.columns.map(column =>
        column.id === id ? { ...column, name } : column,
      ),
    };
  };
