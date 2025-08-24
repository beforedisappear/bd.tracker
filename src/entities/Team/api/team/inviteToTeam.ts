import { apiClient } from '@/shared/api/c';
import type { InviteToTeamDtoReq, InviteToTeamDtoRes } from '../../model/types';

export const inviteToTeamRequest = async (data: InviteToTeamDtoReq) => {
  const { teamIdOrSlug, ...body } = data;

  return apiClient.withAuth.post<InviteToTeamDtoRes>(
    `/team/${teamIdOrSlug}/invitation/send`,
    body,
  );
};
