import type { DeleteColumnDtoRes, GetBoardByIdDtoRes } from '../../types';

type Res = DeleteColumnDtoRes;
type Cache = GetBoardByIdDtoRes;

export const deleteColumnQueryUpdater = (res: Res) => (cache: Cache) => ({
  ...cache,
  columns: cache.columns.filter(column => column.id !== res.id),
});
