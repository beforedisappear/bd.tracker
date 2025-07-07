import { apiClient } from '@/shared/api/c';

import type { RenameColumnDtoReq, RenameColumnDtoRes } from '../../model/types';

export const renameColumn = async (dto: RenameColumnDtoReq) => {
  const { id, name } = dto;

  return apiClient.withAuth
    .patch<RenameColumnDtoRes>(`/column/${id}/rename`, { name })
    .then(res => res.data);
};
