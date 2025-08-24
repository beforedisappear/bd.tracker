import { apiClient } from '@/shared/api/c';

import type { RenameTeamDtoReq, Team } from '../../model/types';

export const renameTeamRequest = async (dto: RenameTeamDtoReq) => {
  return apiClient.withAuth.patch<Team>(`/team/${dto.idOrSlug}/rename`, {
    name: dto.name,
  });
};
