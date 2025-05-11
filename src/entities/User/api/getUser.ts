import { apiClient } from '@/shared/api/c';

import type { GetUserDtoRes } from '../model/types';

export function getUser() {
  return apiClient.withAuth.get<GetUserDtoRes>('/profile');
}
