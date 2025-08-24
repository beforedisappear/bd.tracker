import { apiClient } from '@/shared/api/c';

import type {
  GetHaveAccessToTeamDto,
  GetHaveAccessToTeamDtoRes,
} from '../../model/types';

export const getHaveAccessToTeamRequest = async (
  dto: GetHaveAccessToTeamDto,
) => {
  return apiClient.withAuth.get<GetHaveAccessToTeamDtoRes>(
    `/team/${dto.idOrSlug}/access`,
  );
};
