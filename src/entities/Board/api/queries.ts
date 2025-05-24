import { queryOptions } from '@tanstack/react-query';
import { getAllBoards } from './getAllBoards';
import type { GetAllBoardsDtoReq } from '../model/types';

export const boardQueries = {
  all: (projectId: string) => ['boards', projectId],

  getAllBoards: (dto: GetAllBoardsDtoReq) =>
    queryOptions({
      queryKey: [...boardQueries.all(dto.projectId)],
      queryFn: () => getAllBoards(dto),
      select: res => res.data,
    }),
};
