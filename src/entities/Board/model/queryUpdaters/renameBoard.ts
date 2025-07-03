import type { GetAllBoardsDtoRes, RenameBoardDtoReq } from '../types';
import type { AxiosResponse } from 'axios';

type Args = RenameBoardDtoReq;
type Cache = AxiosResponse<GetAllBoardsDtoRes>;

export const renameBoardQueryUpdater =
  ({ boardId, name }: Args) =>
  (cachedData: Cache) => ({
    ...cachedData,
    data: cachedData.data.map(board =>
      board.id === boardId ? { ...board, name } : board,
    ),
  });
