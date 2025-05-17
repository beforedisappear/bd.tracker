import { apiClient } from '@/shared/api/apiClient';
import type { InviteToTeamDtoReq, InviteToTeamDtoRes } from '../models/types';

export const inviteToTeam = async (data: InviteToTeamDtoReq) => {
  const { teamIdOrSlug, ...rest } = data;

  const body = {
    ...rest,
    projectIds: Object.keys(rest.projectIds).filter(
      key => rest.projectIds[key],
    ),
  };

  return apiClient.withAuth.post<InviteToTeamDtoRes>(
    `/team/${teamIdOrSlug}/invitation/send`,
    body,
  );
};
