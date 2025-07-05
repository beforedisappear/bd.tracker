import type { CreateBoardDtoRes, GetAllBoardsDtoRes } from '../../types';

type Res = CreateBoardDtoRes;
type Cache = GetAllBoardsDtoRes;

export const createBoardQueryUpdater = (res: Res) => (cachedData: Cache) => [
  ...cachedData,
  res,
];
