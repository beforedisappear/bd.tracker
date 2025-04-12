import { apiClient } from '@/shared/api';

import type { AuthDtoReq } from './types';

export function auth(dto: AuthDtoReq) {
  return apiClient.noAuth.post<unknown>('/auth', dto);
}
