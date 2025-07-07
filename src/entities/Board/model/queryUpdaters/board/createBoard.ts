import type { CreateBoardDtoRes, GetAllBoardsDtoRes } from '../../types';

type Res = CreateBoardDtoRes;
type Cache = GetAllBoardsDtoRes;

export const createBoardQueryUpdater =
  (res: Res, projectId?: string) => (oldData: Cache) => {
    if (projectId && res.projectId !== projectId) return oldData;

    return [...oldData, res];
  };
