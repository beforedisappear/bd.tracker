import { apiClient } from '@/shared/api/c';

import type {
  GetHaveAccessToTeamDto,
  GetHaveAccessToTeamDtoRes,
} from '../models/types';

export function getHaveAccessToTeam(dto: GetHaveAccessToTeamDto) {
  return apiClient.withAuth.get<GetHaveAccessToTeamDtoRes>(
    `/team/${dto.idOrSlug}/access`,
  );
}
