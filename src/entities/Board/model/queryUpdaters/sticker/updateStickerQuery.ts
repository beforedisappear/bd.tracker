import type {
  GetAllBoardStickersDotRes,
  UpdateBoardStickerDtoRes,
} from '../../types';

type Res = UpdateBoardStickerDtoRes;
type Cache = GetAllBoardStickersDotRes;

export const updateStickerQueryUpdater = (res: Res) => (oldData: Cache) =>
  oldData.map(sticker => (sticker.id === res.id ? res : sticker));
