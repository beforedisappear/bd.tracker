import { apiClient } from '@/shared/api/apiClient';
import type {
  UpdateProjectMembersDtoReq,
  UpdateProjectMembersDtoRes,
} from '../models/types';

export const updateProjectMembers = async (dto: UpdateProjectMembersDtoReq) => {
  return apiClient.withAuth.post<UpdateProjectMembersDtoRes>(
    `/project/${dto.projectId}/members/update`,
    { membersIds: dto.membersIds },
  );
};
