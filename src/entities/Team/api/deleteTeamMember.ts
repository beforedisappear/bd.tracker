import { apiClient } from '@/shared/api/c';
import { DeleteTeamMemberDtoReq } from '../models/types';

export const deleteTeamMember = async (dto: DeleteTeamMemberDtoReq) => {
  return apiClient.withAuth.delete(
    `/team/${dto.teamIdOrSlug}/members/${dto.memberId}`,
  );
};
