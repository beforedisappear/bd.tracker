import { apiClient } from '@/shared/api/c';

import type { CreateTaskDtoReq, CreateTaskDtoRes } from '../../model/types';

export function createTask(dto: CreateTaskDtoReq) {
  return apiClient.withAuth
    .post<CreateTaskDtoRes>('/task', dto)
    .then(res => res.data);
}
