import { apiClient } from '@/shared/api/c';
import { RenameProjectDtoReq, RenameProjectDtoRes } from '../../model/types';

export const renameProjectRequest = async (dto: RenameProjectDtoReq) => {
  const { projectId, name } = dto;

  return apiClient.withAuth.patch<RenameProjectDtoRes>(
    `/project/${projectId}/rename`,
    { name },
  );
};
