import { apiClient } from '@/shared/api/c';
import type { InviteToTeamDtoReq, InviteToTeamDtoRes } from '../models/types';

export const inviteToTeam = async (data: InviteToTeamDtoReq) => {
  const { teamIdOrSlug, ...body } = data;

  return apiClient.withAuth.post<InviteToTeamDtoRes>(
    `/team/${teamIdOrSlug}/invitation/send`,
    body,
  );
};
