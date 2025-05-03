import { apiClient } from '@/shared/api/c';

import type { LogoutDtoReq } from '../model/types/logout';

export function logout(dto: LogoutDtoReq) {
  return apiClient.noAuth.post('/logout', dto);
}
