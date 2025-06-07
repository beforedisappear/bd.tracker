import { apiClient } from '@/shared/api/c';

import type { DeleteTaskDtoReq, DeleteTaskDtoRes } from '../../model/types';

export async function deleteTask(dto: DeleteTaskDtoReq) {
  return apiClient.withAuth.delete<DeleteTaskDtoRes>(`/task/${dto.taskId}`);
}
