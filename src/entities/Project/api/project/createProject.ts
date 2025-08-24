import { apiClient } from '@/shared/api/c';

import type { CreateProjectDto, CreateProjectDtoRes } from '../../model/types';

export const createProjectRequest = async (dto: CreateProjectDto) => {
  return apiClient.withAuth.post<CreateProjectDtoRes>('/project', dto);
};
