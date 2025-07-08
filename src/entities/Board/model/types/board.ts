import type { DateRange } from './dateRange';
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

export type DeleteBoardDtoRes = {
  id: string;
  tenantId: string;
};

export type RenameBoardDtoReq = {
  id: string;
  projectId: string; // for invalidation
  name: string;
};

export type RenameBoardDtoRes = {
  id: string;
  tenantId: string;
};
