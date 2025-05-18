import { apiClient } from '@/shared/api/c';

import type {
  DeleteTeamMemberAdminDtoReq,
  DeleteTeamMemberAdminDtoRes,
} from '../models/types/teamAdmin';

export const deleteAdmin = async (dto: DeleteTeamMemberAdminDtoReq) => {
  return apiClient.withAuth.delete<DeleteTeamMemberAdminDtoRes>(
    `/team/${dto.teamIdOrSlug}/members/${dto.memberId}/admin`,
  );
};
