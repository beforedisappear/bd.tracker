import { apiClient } from '@/shared/api/c';

import type { MoveTaskDtoReq, MoveTaskDtoRes } from '../../model/types';

export async function moveTask(dto: MoveTaskDtoReq) {
  const { id, ...body } = dto;

  return apiClient.withAuth
    .patch<MoveTaskDtoRes>(`/task/${id}/move`, body)
    .then(res => res.data);
}
