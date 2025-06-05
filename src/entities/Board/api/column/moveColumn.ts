import { apiClient } from '@/shared/api/c';

import type { MoveColumnDtoReq, MoveColumnDtoRes } from '../../model/types';

export const moveColumn = async (dto: MoveColumnDtoReq) => {
  return apiClient.withAuth.put<MoveColumnDtoRes>(
    `/column/${dto.columnId}/move`,
    dto,
  );
};
