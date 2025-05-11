import { apiClient } from '@/shared/api/c';

import type { DeleteTeamDtoReq, DeleteTeamDtoRes } from '../models/types';

export function deleteTeam(dto: DeleteTeamDtoReq) {
  return apiClient.withAuth.delete<DeleteTeamDtoRes>(`/team/${dto.idOrSlug}`);
}
