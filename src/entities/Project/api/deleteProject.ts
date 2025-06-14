import { apiClient } from '@/shared/api/c';

import type { DeleteProjectDtoReq, DeleteProjectDtoRes } from '../models/types';

export const deleteProject = async (dto: DeleteProjectDtoReq) => {
  return apiClient.withAuth.delete<DeleteProjectDtoRes>(
    `/project/${dto.projectId}`,
  );
};
