import { apiClient } from '@/shared/api/c';

import type { MoveColumnDtoReq, MoveColumnDtoRes } from '../../model/types';

export const moveColumnRequest = async (dto: MoveColumnDtoReq) => {
  const { columnId, ...body } = dto;

  return apiClient.withAuth
    .patch<MoveColumnDtoRes>(`/column/${columnId}/move`, body)
    .then(res => res.data);
};
