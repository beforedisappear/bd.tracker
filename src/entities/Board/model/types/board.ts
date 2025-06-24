import type { DateRange } from 'react-day-picker';
import type { Color } from './color';
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
  colors?: Color[];
  assigneeIds?: string[];
  dateRange?: DateRange;
  stickerIds?: string[];
};

export type GetBoardByIdDtoRes = Board;

export type BoardByIdParams = Record<string, string>;

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
