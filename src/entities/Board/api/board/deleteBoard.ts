import { apiClient } from '@/shared/api/c';

import { DeleteBoardDtoReq, DeleteBoardDtoRes } from '../../model/types/board';

export const deleteBoard = async (dto: DeleteBoardDtoReq) => {
  return apiClient.withAuth.delete<DeleteBoardDtoRes>(`/board/${dto.boardId}`);
};
