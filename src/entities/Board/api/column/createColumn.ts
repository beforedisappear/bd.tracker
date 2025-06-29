import { apiClient } from '@/shared/api/apiClient';

import type { CreateColumnDtoReq, CreateColumnDtoRes } from '../../model/types';

export const createColumn = async (dto: CreateColumnDtoReq) => {
  return apiClient.withAuth.post<CreateColumnDtoRes>('/column', dto);
};
