import { apiClient } from '@/shared/api/apiClient';

import type { GetAllBoardsDtoReq, GetAllBoardsDtoRes } from '../model/types';

export const getAllBoards = (dto: GetAllBoardsDtoReq) => {
  return apiClient.withAuth.get<GetAllBoardsDtoRes>('/board', {
    params: dto,
  });
};
