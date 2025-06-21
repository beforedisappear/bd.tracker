import { apiClient } from '@/shared/api/c';

import type { RenameColumnDtoReq, RenameColumnDtoRes } from '../../model/types';

export const renameColumn = async (dto: RenameColumnDtoReq) => {
  return apiClient.withAuth.patch<RenameColumnDtoRes>(
    `/column/${dto.columnId}/rename`,
    { name: dto.name },
  );
};
