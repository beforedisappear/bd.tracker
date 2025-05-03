import { apiClient } from '@/shared/api/c';

import type { AuthDtoReq } from '../model/types';

export function auth(dto: AuthDtoReq) {
  return apiClient.noAuth.post<unknown>('/auth', dto);
}
