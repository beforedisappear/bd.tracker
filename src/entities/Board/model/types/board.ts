export interface SummaryBoard {
  id: string;
  name: string;
  createdAt: string;
  projectId: string;
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
