import type {
  GetAllBoardStickersDotRes,
  CreateBoardStickerDtoRes,
} from '../../types';

type Res = CreateBoardStickerDtoRes;
type Cache = GetAllBoardStickersDotRes;

export const createStickerQueryUpdater = (res: Res) => (oldData: Cache) => [
  ...oldData,
  res,
];
