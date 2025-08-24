import { apiClient } from '@/shared/api/c';

import type { CreateColumnDtoReq, CreateColumnDtoRes } from '../../model/types';

export const createColumnRequest = async (dto: CreateColumnDtoReq) => {
  return apiClient.withAuth
    .post<CreateColumnDtoRes>('/column', dto)
    .then(res => res.data);
};
