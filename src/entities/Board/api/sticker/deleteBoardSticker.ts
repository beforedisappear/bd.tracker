import { apiClient } from '@/shared/api/c';
import {
  DeleteBoardStickerDtoReq,
  DeleteBoardStickerDtoRes,
} from '../../model/types';

export const deleteBoardSticker = async (dto: DeleteBoardStickerDtoReq) => {
  const { id, boardId } = dto;

  return apiClient.withAuth
    .delete<DeleteBoardStickerDtoRes>(`/board/${boardId}/sticker/${id}`)
    .then(res => res.data);
};
