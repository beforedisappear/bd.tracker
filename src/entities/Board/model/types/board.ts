import type { Column } from './column';

export interface SummaryBoard {
  id: string;
  name: string;
  createdAt: string;
  projectId: string;
}

export interface Board extends SummaryBoard {
  columns: Column[];
}

export type GetAllBoardsDtoReq = {
  projectId: string;
};

export type GetAllBoardsDtoRes = SummaryBoard[];

export type CreateBoardDtoReq = {
  projectId: string;
  name: string;
};

export type CreateBoardDtoRes = SummaryBoard;

export type GetBoardByIdDtoReq = {
  boardId: string;
};

export type GetBoardByIdDtoRes = Board;

export type DeleteBoardDtoReq = {
  boardId: string;
  projectId: string; // for invalidation
};

export type DeleteBoardDtoRes = never;

export type RenameBoardDtoReq = {
  projectId: string; // for invalidation
  boardId: string;
  name: string;
};

export type RenameBoardDtoRes = never;
