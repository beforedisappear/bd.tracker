import { apiClient } from '@/shared/api/c';

import type { RenameBoardDtoReq, RenameBoardDtoRes } from '../../model/types';

export function renameBoardRequest(dto: RenameBoardDtoReq) {
  const { id, name } = dto;

  return apiClient.withAuth.patch<RenameBoardDtoRes>(`/board/${id}/rename`, {
    name,
  });
}
