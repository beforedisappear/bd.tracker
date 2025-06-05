import { apiClient } from '@/shared/api/apiClient';
import type { GetBoardByIdDtoReq, GetBoardByIdDtoRes } from '../../model/types';

export const getBoardById = async (dto: GetBoardByIdDtoReq) => {
  return apiClient.withAuth.get<GetBoardByIdDtoRes>(`/board/${dto.boardId}`);
};
