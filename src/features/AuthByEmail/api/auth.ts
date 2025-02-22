import { apiClient } from '@/shared/api';

import type { AuthDto } from '$/types';

export function auth(dto: AuthDto) {
  return apiClient.noAuth.post<unknown>('/auth', dto);
}
