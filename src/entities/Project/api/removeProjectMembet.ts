import { apiClient } from '@/shared/api/c';
import type {
  RemoveProjectMemberDtoReq,
  RemoveProjectMemberDtoRes,
} from '../models/types';

export const removeProjectMember = async (dto: RemoveProjectMemberDtoReq) => {
  return apiClient.withAuth.delete<RemoveProjectMemberDtoRes>(
    `/project/${dto.projectId}/members/${dto.memberId}`,
  );
};
