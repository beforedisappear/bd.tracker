import { apiClient } from '@/shared/api/c';

import type { GetTaskByIdDtoReq, GetTaskByIdDtoRes } from '../../model/types';

export const getTaskById = async (dto: GetTaskByIdDtoReq) => {
  return apiClient.withAuth.get<GetTaskByIdDtoRes>(`/task/${dto.taskId}`);
};
