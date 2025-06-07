import { apiClient } from '@/shared/api/c';

import type { MoveTaskDtoReq, MoveTaskDtoRes } from '../../model/types';

export async function moveTask(dto: MoveTaskDtoReq) {
  const { taskId, ...body } = dto;

  return apiClient.withAuth.patch<MoveTaskDtoRes>(`/task/${taskId}/move`, body);
}
