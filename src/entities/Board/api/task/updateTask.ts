import { apiClient } from '@/shared/api/c';

import type { UpdateTaskDtoReq, UpdateTaskDtoRes } from '../../model/types';

export async function updateTask(dto: UpdateTaskDtoReq) {
  const { taskId, ...body } = dto;

  return apiClient.withAuth.patch<UpdateTaskDtoRes>(
    `/task/${taskId}/update`,
    body,
  );
}
