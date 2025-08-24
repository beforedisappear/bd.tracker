import { apiClient } from '@/shared/api/c';
import type {
  DeleteTeamMemberDtoReq,
  DeleteTeamMemberDtoRes,
} from '../../model/types';

export const deleteTeamMemberRequest = async (dto: DeleteTeamMemberDtoReq) => {
  return apiClient.withAuth.delete<DeleteTeamMemberDtoRes>(
    `/team/${dto.teamIdOrSlug}/members/${dto.memberId}`,
  );
};
