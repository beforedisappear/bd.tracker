import { apiClient } from '@/shared/api/apiClient';

import type { CreateBoardDtoReq } from '../../model/types';

export const createBoard = async (data: CreateBoardDtoReq) => {
  return apiClient.withAuth.post('/board', data);
};
