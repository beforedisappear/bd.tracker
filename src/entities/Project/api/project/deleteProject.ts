import { apiClient } from '@/shared/api/c';

import type {
  DeleteProjectDtoReq,
  DeleteProjectDtoRes,
} from '../../model/types';

export const deleteProjectRequest = async (dto: DeleteProjectDtoReq) => {
  return apiClient.withAuth.delete<DeleteProjectDtoRes>(
    `/project/${dto.projectId}`,
  );
};
