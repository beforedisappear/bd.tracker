import { apiClient } from '@/shared/api/c';
import {
  UpdateBoardStickerDtoReq,
  UpdateBoardStickerDtoRes,
} from '../../model/types';

export const updateBoardSticker = async (dto: UpdateBoardStickerDtoReq) => {
  const { boardId, id, ...body } = dto;

  return apiClient.withAuth
    .patch<UpdateBoardStickerDtoRes>(`/board/${boardId}/sticker/${id}`, body)
    .then(res => res.data);
};
