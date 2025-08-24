import { apiClient } from '@/shared/api/c';

import type { DeleteTaskDtoReq, DeleteTaskDtoRes } from '../../model/types';

export async function deleteTaskRequest(dto: DeleteTaskDtoReq) {
  const { id } = dto;

  return apiClient.withAuth
    .delete<DeleteTaskDtoRes>(`/task/${id}`)
    .then(res => res.data);
}
