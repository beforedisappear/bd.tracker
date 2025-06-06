import { apiClient } from '@/shared/api/c';

import type { LoginDtoReq, LoginDtoRes } from '../model/types';

export function login(dto: LoginDtoReq) {
  return apiClient.noAuth.post<LoginDtoRes>('/login', dto);
}
