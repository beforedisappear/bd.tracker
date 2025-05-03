import { apiClient } from '@/shared/api/c';

import type { CreateTeamDtoReq, Team } from '../models/types';

export function createTeam(dto: CreateTeamDtoReq) {
  return apiClient.withAuth.post<Team>('/team', dto);
}
