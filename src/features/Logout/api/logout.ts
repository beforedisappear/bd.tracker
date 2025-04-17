import { apiClient } from '@/shared/api';

import type { LogoutDtoReq } from './types';

export function logout(dto: LogoutDtoReq) {
  return apiClient.noAuth.post('/logout', dto);
}
