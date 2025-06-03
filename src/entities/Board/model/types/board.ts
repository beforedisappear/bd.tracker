export interface SummaryBoard {
  id: string;
  name: string;
  createdAt: string;
  projectId: string;
}

export type Board = SummaryBoard & {};

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
};

export type DeleteBoardDtoRes = never;
