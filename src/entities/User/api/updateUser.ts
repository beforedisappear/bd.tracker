import { UpdateUserDtoReq } from '../model/types';

import { apiClient } from '@/shared/api/c';

import type { User } from '../model/types';

export const updateUser = async (user: UpdateUserDtoReq) => {
  return apiClient.withAuth.put<User>(`/profile`, user);
};
