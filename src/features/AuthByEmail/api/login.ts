import { apiClient } from '@/shared/api';

import type { LoginDto, LoginResponse } from '$/types';

export function login(dto: LoginDto) {
  return apiClient.axiosNoAuth.post<LoginResponse>('/login', dto);
}
