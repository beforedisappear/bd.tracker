import type { GetBoardByIdDtoRes, CreateColumnDtoRes } from '../../types';

type Res = CreateColumnDtoRes;
type Cache = GetBoardByIdDtoRes;

export const createColumnQueryUpdater = (res: Res) => (oldData: Cache) => {
  if (res.boardId !== oldData.id) return oldData;

  return {
    ...oldData,
    columns: [...oldData.columns, res],
  };
};
