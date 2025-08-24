import { apiClient } from '@/shared/api/c';

import type {
  DeleteTeamMemberAdminDtoReq,
  DeleteTeamMemberAdminDtoRes,
} from '../../model/types';

export const deleteAdminRequest = async (dto: DeleteTeamMemberAdminDtoReq) => {
  return apiClient.withAuth.delete<DeleteTeamMemberAdminDtoRes>(
    `/team/${dto.teamIdOrSlug}/members/${dto.memberId}/admin`,
  );
};
