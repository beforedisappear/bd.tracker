import { apiClient } from '@/shared/api/c';

import type { RenameBoardDtoReq, RenameBoardDtoRes } from '../../model/types';

export function renameBoard(dto: RenameBoardDtoReq) {
  const { boardId, name } = dto;

  return apiClient.withAuth.patch<RenameBoardDtoRes>(
    `/board/${boardId}/rename`,
    { name },
  );
}
