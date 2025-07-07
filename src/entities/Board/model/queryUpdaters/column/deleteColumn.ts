import type { DeleteColumnDtoRes, GetBoardByIdDtoRes } from '../../types';

type Res = DeleteColumnDtoRes;
type Cache = GetBoardByIdDtoRes;

export const deleteColumnQueryUpdater = (res: Res) => (oldData: Cache) => {
  if (res.boardId !== oldData.id) return oldData;

  return {
    ...oldData,
    columns: oldData.columns.filter(column => column.id !== res.id),
  };
};
