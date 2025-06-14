import { apiClient } from '@/shared/api/apiClient';

import type {
  GetProjectsByTeamDtoReq,
  GetProjectsByTeamDtoRes,
} from '../models/types';

export const getProjectsByTeam = async (dto: GetProjectsByTeamDtoReq) => {
  return apiClient.withAuth.get<GetProjectsByTeamDtoRes>(`/project`, {
    params: dto,
  });
};
