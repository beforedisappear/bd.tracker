import { apiClient } from '@/shared/api/apiClient';

import type { CreateBoardDtoReq, CreateBoardDtoRes } from '../../model/types';

export const createBoard = async (data: CreateBoardDtoReq) => {
  return apiClient.withAuth
    .post<CreateBoardDtoRes>('/board', data)
    .then(res => res.data);
};
