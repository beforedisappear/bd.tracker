import { apiClient } from '@/shared/api/c';

import type { CreateProjectDto, CreateProjectDtoRes } from '../models/types';

export const createProject = async (dto: CreateProjectDto) => {
  return apiClient.withAuth.post<CreateProjectDtoRes>('/project', dto);
};
