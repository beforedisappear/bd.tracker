import { apiClient } from '@/shared/api/c';

import type { CreateTaskDtoReq, CreateTaskDtoRes } from '../../model/types';

export async function createTaskRequest(dto: CreateTaskDtoReq) {
  return apiClient.withAuth
    .post<CreateTaskDtoRes>('/task', dto)
    .then(res => res.data);
}
