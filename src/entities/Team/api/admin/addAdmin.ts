import { apiClient } from '@/shared/api/c';

import type {
  AddTeamMemberAdminDtoReq,
  AddTeamMemberAdminDtoRes,
} from '../../model/types';

export const addAdminRequest = async (dto: AddTeamMemberAdminDtoReq) => {
  return apiClient.withAuth.patch<AddTeamMemberAdminDtoRes>(
    `/team/${dto.teamIdOrSlug}/members/${dto.memberId}/admin`,
  );
};
