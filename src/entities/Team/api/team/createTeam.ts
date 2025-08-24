import { apiClient } from '@/shared/api/c';

import type { CreateTeamDtoReq, Team } from '../../model/types';

export const createTeamRequest = async (dto: CreateTeamDtoReq) => {
  return apiClient.withAuth.post<Team>('/team', dto);
};
