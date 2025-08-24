import { apiClient } from '@/shared/api/c';

import type { GetTeamByIdDtoReq, GetTeamByIdDtoRes } from '../../model/types';

export const getTeamByIdRequest = async (dto: GetTeamByIdDtoReq) => {
  return apiClient.withAuth.get<GetTeamByIdDtoRes>(`/team/${dto.idOrSlug}`);
};
