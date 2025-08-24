import { apiClient } from '@/shared/api/c';
import {
  CreateBoardStickerDtoReq,
  CreateBoardStickerDtoRes,
} from '../../model/types';

export const createBoardStickerRequest = async (
  dto: CreateBoardStickerDtoReq,
) => {
  const { boardId, ...body } = dto;

  return apiClient.withAuth
    .post<CreateBoardStickerDtoRes>(`/board/${boardId}/sticker`, body)
    .then(res => res.data);
};
