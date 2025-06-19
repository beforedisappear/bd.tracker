import { apiClient } from '@/shared/api/c';
import { RenameProjectDtoReq, RenameProjectDtoRes } from '../models/types';

export const renameProject = async (dto: RenameProjectDtoReq) => {
  const { projectId, name } = dto;

  return apiClient.withAuth.patch<RenameProjectDtoRes>(
    `/project/${projectId}/rename`,
    { name },
  );
};
