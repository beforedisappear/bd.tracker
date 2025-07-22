import { apiClient } from '@/shared/api/c';

import type { GetAllBoardsDtoReq, GetAllBoardsDtoRes } from '../../model/types';

export const getAllBoards = (dto: GetAllBoardsDtoReq) => {
  return apiClient.withAuth
    .get<GetAllBoardsDtoRes>('/board', {
      params: dto,
    })
    .then(res => res.data);
};
