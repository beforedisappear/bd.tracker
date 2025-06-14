import { apiClient } from '@/shared/api/c';
import {
  DeleteBoardStickerDtoReq,
  DeleteBoardStickerDtoRes,
} from '../../model/types';

export const deleteBoardSticker = (dto: DeleteBoardStickerDtoReq) => {
  const { boardId, stickerId } = dto;

  return apiClient.withAuth.delete<DeleteBoardStickerDtoRes>(
    `/board/${boardId}/sticker/${stickerId}`,
  );
};
