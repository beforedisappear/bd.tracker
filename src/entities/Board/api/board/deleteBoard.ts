import { apiClient } from '@/shared/api/c';

import { DeleteBoardDtoReq, DeleteBoardDtoRes } from '../../model/types/board';

export const deleteBoardRequest = async (dto: DeleteBoardDtoReq) => {
  return apiClient.withAuth
    .delete<DeleteBoardDtoRes>(`/board/${dto.boardId}`)
    .then(res => res.data);
};
