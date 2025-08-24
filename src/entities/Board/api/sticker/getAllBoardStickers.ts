import { apiClient } from '@/shared/api/c';
import {
  GetAllBoardStickersDtoReq,
  GetAllBoardStickersDotRes,
} from '../../model/types';

export const getAllBoardStickersRequest = async (
  dto: GetAllBoardStickersDtoReq,
) => {
  const { boardId } = dto;

  return apiClient.withAuth
    .get<GetAllBoardStickersDotRes>(`/board/${boardId}/sticker`)
    .then(res => res.data);
};
