import { Color } from './color';

export type StickerMenuTriggerType = 'badge' | 'button';

export interface Sticker {
  id: string;
  name: string;
  color: Color;
  createdAt: string;
  updatedAt: string;
  boardId: string;
  projectId: string;
}

export interface GetAllBoardStickersDtoReq {
  boardId: string;
}

export type GetAllBoardStickersDotRes = Sticker[];

export interface CreateBoardStickerDtoReq {
  boardId: string;
  name: string;
  color?: Color;
}

export type CreateBoardStickerDtoRes = Sticker;

export interface UpdateBoardStickerDtoReq {
  id: string;
  boardId: string;
  name?: string;
  color?: Color;
}

export type UpdateBoardStickerDtoRes = Sticker;

export interface DeleteBoardStickerDtoReq
  extends Pick<Sticker, 'id' | 'boardId'> {}

export interface DeleteBoardStickerDtoRes {
  id: string;
}
