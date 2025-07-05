import type { GetBoardByIdDtoRes, CreateColumnDtoRes } from '../../types';

type Res = CreateColumnDtoRes;
type Cache = GetBoardByIdDtoRes;

export const createColumnQueryUpdater = (res: Res) => (cache: Cache) => ({
  ...cache,
  columns: [...cache.columns, res],
});
