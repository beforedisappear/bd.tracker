import { apiClient } from '@/shared/api/apiClient';
import {
  GetProjectMembersDtoReq,
  GetProjectMembersDtoRes,
} from '../models/types/projectMember';

export const getProjectMembers = async (dto: GetProjectMembersDtoReq) => {
  return apiClient.withAuth.get<GetProjectMembersDtoRes>(
    `/project/${dto.projectId}/members`,
    {
      params: { keyword: dto.keyword },
    },
  );
};
