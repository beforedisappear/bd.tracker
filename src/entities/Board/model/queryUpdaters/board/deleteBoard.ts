import type { DeleteBoardDtoRes, GetAllBoardsDtoRes } from '../../types';

type Res = DeleteBoardDtoRes;
type Cache = GetAllBoardsDtoRes;

export const deleteBoardQueryUpdater =
  ({ id }: Res) =>
  (cache: Cache) =>
    cache.filter(board => board.id !== id);
