import { apiClient } from '@/shared/api';

import type { LogoutDto, LogoutResponse } from '$/types';

export function logout(dto: LogoutDto) {
  return apiClient.axiosNoAuth.post<LogoutResponse>('/logout', dto);
}
