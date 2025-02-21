import { apiClient } from '@/shared/api';

import type { AuthDto } from '$/types';

export function auth(dto: AuthDto) {
  return apiClient.axiosNoAuth.post<unknown>('/auth', dto);
}
