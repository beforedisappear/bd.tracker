import { apiClient } from '@/shared/api';

import type { GetUserTeamListDtoRes } from '../models/types';

export function getUserTeamList() {
  return apiClient.withAuth.get<GetUserTeamListDtoRes>('/team');
}
