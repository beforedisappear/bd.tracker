import { apiClient } from '@/shared/api/apiClient';

import type {
  GetProjectsByTeamDto,
  GetProjectsByTeamDtoRes,
} from '../models/types';

export const getProjectsByTeam = async (dto: GetProjectsByTeamDto) => {
  return apiClient.withAuth.get<GetProjectsByTeamDtoRes>(`/project`, {
    params: dto,
  });
};
