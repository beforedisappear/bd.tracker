import { apiClient } from '@/shared/api/c';

import type { RenameTeamDtoReq, Team } from '../models/types';

export function renameTeam(dto: RenameTeamDtoReq) {
  return apiClient.withAuth.patch<Team>(`/team/${dto.idOrSlug}/rename`, {
    name: dto.name,
  });
}
