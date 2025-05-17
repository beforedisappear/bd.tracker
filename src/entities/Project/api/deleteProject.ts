import { apiClient } from '@/shared/api/apiClient';

import type { DeleteProjectDtoReq, DeleteProjectDtoRes } from '../models/types';

export const deleteProject = async (dto: DeleteProjectDtoReq) => {
  return apiClient.withAuth.delete<DeleteProjectDtoRes>(
    `/project/${dto.projectId}`,
  );
};
