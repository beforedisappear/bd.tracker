import { apiClient } from '@/shared/api';

import type { CreateTeamDtoReq } from '../models/types';

export function createTeam(dto: CreateTeamDtoReq) {
  return apiClient.withAuth.post<unknown>('/team', dto);
}
