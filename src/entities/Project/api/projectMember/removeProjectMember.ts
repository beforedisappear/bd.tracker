import { apiClient } from '@/shared/api/c';
import type {
  RemoveProjectMemberDtoReq,
  RemoveProjectMemberDtoRes,
} from '../../model/types';

export const removeProjectMemberRequest = async (
  dto: RemoveProjectMemberDtoReq,
) => {
  return apiClient.withAuth.delete<RemoveProjectMemberDtoRes>(
    `/project/${dto.projectId}/members/${dto.memberId}`,
  );
};
