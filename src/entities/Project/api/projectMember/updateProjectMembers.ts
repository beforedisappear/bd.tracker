import { apiClient } from '@/shared/api/c';
import type {
  UpdateProjectMembersDtoReq,
  UpdateProjectMembersDtoRes,
} from '../../model/types';

export const updateProjectMembersRequest = async (
  dto: UpdateProjectMembersDtoReq,
) => {
  return apiClient.withAuth.post<UpdateProjectMembersDtoRes>(
    `/project/${dto.projectId}/members/update`,
    { membersIds: dto.membersIds },
  );
};
