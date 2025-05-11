import { apiClient } from '@/shared/api/apiClient';

import type { GetTeamByIdDtoReq, GetTeamByIdDtoRes } from '../models/types';

export const getTeamById = (dto: GetTeamByIdDtoReq) => {
  return apiClient.withAuth.get<GetTeamByIdDtoRes>(`/team/${dto.idOrSlug}`);
};
