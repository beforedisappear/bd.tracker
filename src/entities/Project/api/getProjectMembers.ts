import { apiClient } from '@/shared/api/apiClient';
import { GetProjectMembersDtoReq } from '../models/types/projectMember';

export const getProjectMembers = async (dto: GetProjectMembersDtoReq) => {
  return apiClient.withAuth.get(`/project/${dto.projectId}/members`, {
    params: { keyword: dto.keyword },
  });
};
