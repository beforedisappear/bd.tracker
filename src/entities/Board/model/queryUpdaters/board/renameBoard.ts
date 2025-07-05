import type { GetAllBoardsDtoRes, RenameBoardDtoReq } from '../../types';

type Args = RenameBoardDtoReq;
type Cache = GetAllBoardsDtoRes;

export const renameBoardQueryUpdater =
  ({ id, name }: Args) =>
  (cache: Cache) =>
    cache.map(board => (board.id === id ? { ...board, name } : board));
