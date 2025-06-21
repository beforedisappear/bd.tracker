import { apiClient } from '@/shared/api/c';
import {
  UpdateBoardStickerDtoReq,
  UpdateBoardStickerDtoRes,
} from '../../model/types';

export const updateBoardSticker = (dto: UpdateBoardStickerDtoReq) => {
  const { boardId, stickerId, ...body } = dto;

  return apiClient.withAuth.patch<UpdateBoardStickerDtoRes>(
    `/board/${boardId}/sticker/${stickerId}`,
    body,
  );
};
