import { apiClient } from '@/shared/api/c';

import type { UpdateTaskDtoReq, UpdateTaskDtoRes } from '../../model/types';

export async function updateTask(dto: UpdateTaskDtoReq) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { taskId, boardId, ...body } = dto;

  return apiClient.withAuth.patch<UpdateTaskDtoRes>(
    `/task/${taskId}/update`,
    body,
  );
}
