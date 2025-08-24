import { apiClient } from '@/shared/api/c';

import type { GetUserTeamListDtoRes } from '../../model/types';

export const getUserTeamListRequest = async () => {
  return apiClient.withAuth
    .get<GetUserTeamListDtoRes>('/team')
    .then(res => res.data);
};
