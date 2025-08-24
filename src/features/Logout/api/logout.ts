import { apiClient } from '@/shared/api/c';

import type { LogoutDtoReq } from '../model/types/logout';

export function logoutRequest(dto: LogoutDtoReq) {
  return apiClient.noAuth.post('/logout', dto);
}
