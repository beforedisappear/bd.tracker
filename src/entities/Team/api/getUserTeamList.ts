import { apiClient } from '@/shared/api/c';

import type { GetUserTeamListDtoRes } from '../models/types';

export function getUserTeamList() {
  return apiClient.withAuth.get<GetUserTeamListDtoRes>('/team');
}
