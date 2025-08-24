import { apiClient } from '@/shared/api/c';
import type {
  AddProjectMemberDtoReq,
  AddProjectMemberDtoRes,
} from '../../model/types';

export const addProjectMemberRequest = async (dto: AddProjectMemberDtoReq) => {
  return apiClient.withAuth.post<AddProjectMemberDtoRes>(
    `/project/${dto.projectId}/members`,
    { memberId: dto.memberId },
  );
};
