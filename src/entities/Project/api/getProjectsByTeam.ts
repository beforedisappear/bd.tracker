import { apiClient } from '@/shared/api/c';

import type {
  GetProjectsByTeamDtoReq,
  GetProjectsByTeamDtoRes,
} from '../models/types';

export const getProjectsByTeam = async (dto: GetProjectsByTeamDtoReq) => {
  return apiClient.withAuth.get<GetProjectsByTeamDtoRes>(`/project`, {
    params: dto,
  });
};
