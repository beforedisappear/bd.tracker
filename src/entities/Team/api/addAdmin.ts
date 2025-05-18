import { apiClient } from '@/shared/api/c';

import type {
  AddTeamMemberAdminDtoReq,
  AddTeamMemberAdminDtoRes,
} from '../models/types/teamAdmin';

export const addAdmin = async (dto: AddTeamMemberAdminDtoReq) => {
  return apiClient.withAuth.patch<AddTeamMemberAdminDtoRes>(
    `/team/${dto.teamIdOrSlug}/members/${dto.memberId}/admin`,
  );
};
