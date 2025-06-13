import { Color } from './color';

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
  boardId: string;
  stickerId: string;
  name?: string;
  color?: Color;
}

export type UpdateBoardStickerDtoRes = Sticker;

export interface DeleteBoardStickerDtoReq {
  boardId: string;
  stickerId: string;
}

export interface DeleteBoardStickerDtoRes {
  id: string;
}
