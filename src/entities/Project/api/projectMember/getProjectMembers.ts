import { apiClient } from '@/shared/api/c';
import {
  GetProjectMembersDtoReq,
  GetProjectMembersDtoRes,
} from '../../model/types';

export const getProjectMembersRequest = async (
  dto: GetProjectMembersDtoReq,
) => {
  return apiClient.withAuth.get<GetProjectMembersDtoRes>(
    `/project/${dto.projectId}/members`,
    { params: { keyword: dto.keyword } },
  );
};
