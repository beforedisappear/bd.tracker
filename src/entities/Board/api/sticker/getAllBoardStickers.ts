import { apiClient } from '@/shared/api/c';
import {
  GetAllBoardStickersDtoReq,
  GetAllBoardStickersDotRes,
} from '../../model/types';

export const getAllBoardStickers = ({ boardId }: GetAllBoardStickersDtoReq) => {
  return apiClient.withAuth.get<GetAllBoardStickersDotRes>(
    `/board/${boardId}/sticker`,
  );
};
