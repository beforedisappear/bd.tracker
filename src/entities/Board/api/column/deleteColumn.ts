import { apiClient } from '@/shared/api/c';

import type { DeleteColumnDtoReq, DeleteColumnDtoRes } from '../../model/types';

export const deleteColumn = async (dto: DeleteColumnDtoReq) => {
  return apiClient.withAuth
    .delete<DeleteColumnDtoRes>(`/column/${dto.columnId}`)
    .then(res => res.data);
};
