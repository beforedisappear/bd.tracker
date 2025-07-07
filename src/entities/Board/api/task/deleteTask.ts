import { apiClient } from '@/shared/api/c';

import type { DeleteTaskDtoReq, DeleteTaskDtoRes } from '../../model/types';

export async function deleteTask(dto: DeleteTaskDtoReq) {
  const { id } = dto;

  return apiClient.withAuth
    .delete<DeleteTaskDtoRes>(`/task/${id}`)
    .then(res => res.data);
}
