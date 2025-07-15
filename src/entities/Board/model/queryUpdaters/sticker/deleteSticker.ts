import type {
  GetAllBoardStickersDotRes,
  DeleteBoardStickerDtoRes,
} from '../../types';

type Res = DeleteBoardStickerDtoRes;
type Cache = GetAllBoardStickersDotRes;

export const deleteStickerQueryUpdater = (res: Res) => (oldData: Cache) =>
  oldData.filter(sticker => sticker.id !== res.id);
