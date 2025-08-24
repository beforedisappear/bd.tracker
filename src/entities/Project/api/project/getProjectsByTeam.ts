import { apiClient } from '@/shared/api/c';

import type {
  GetProjectsByTeamDtoReq,
  GetProjectsByTeamDtoRes,
} from '../../model/types';

export const getProjectsByTeamRequest = async (
  dto: GetProjectsByTeamDtoReq,
) => {
  return apiClient.withAuth.get<GetProjectsByTeamDtoRes>(`/project`, {
    params: dto,
  });
};
