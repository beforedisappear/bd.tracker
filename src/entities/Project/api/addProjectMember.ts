import { apiClient } from '@/shared/api/c';
import type {
  AddProjectMemberDtoReq,
  AddProjectMemberDtoRes,
} from '../models/types';

export const addProjectMember = async (dto: AddProjectMemberDtoReq) => {
  return apiClient.withAuth.post<AddProjectMemberDtoRes>(
    `/project/${dto.projectId}/members`,
    { memberId: dto.memberId },
  );
};
