import { apiClient } from '@/shared/api/c';

import type { AuthDtoReq, AuthDtoRes } from '../model/types';

export function auth(dto: AuthDtoReq) {
  return apiClient.noAuth.post<AuthDtoRes>('/auth', dto);
}
