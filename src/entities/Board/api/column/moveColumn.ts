import { apiClient } from '@/shared/api/c';

import type { MoveColumnDtoReq, MoveColumnDtoRes } from '../../model/types';

export const moveColumn = async (dto: MoveColumnDtoReq) => {
  const { columnId, ...rest } = dto;

  return apiClient.withAuth.patch<MoveColumnDtoRes>(
    `/column/${columnId}/move`,
    rest,
  );
};
