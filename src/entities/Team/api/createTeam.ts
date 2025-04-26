import { apiClient } from '@/shared/api';

import type { CreateTeamDtoReq, Team } from '../models/types';

export function createTeam(dto: CreateTeamDtoReq) {
  return apiClient.withAuth.post<Team>('/team', dto);
}
