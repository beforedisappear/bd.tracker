import { apiClient } from '@/shared/api';

import type { LoginDtoReq, LoginDtoRes } from './types';

export function login(dto: LoginDtoReq) {
  return apiClient.noAuth.post<LoginDtoRes>('/login', dto);
}
