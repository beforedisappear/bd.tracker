import type { Task } from './task';

export interface Column {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  boardId: string;
  nextColumnId: string | null;
  previousColumn: {
    id: string;
  } | null;
  tasks: Task[];
  projectId: string;
}

export interface CreateColumnDtoReq {
  name: string;
  boardId: string;
}

export type CreateColumnDtoRes = Column;

export interface DeleteColumnDtoReq {
  columnId: string;
  boardId: string; // for invalidation
}

export type DeleteColumnDtoRes = never;

export interface RenameColumnDtoReq {
  columnId: string;
  name: string;
}

export interface RenameColumnDtoRes {
  id: string;
}

export type MoveColumnDtoReq =
  | {
      nextColumnId: string;
      previousColumnId: null;
      columnId: string;
      boardId: string;
    }
  | {
      nextColumnId: null;
      previousColumnId: string;
      columnId: string;
      boardId: string;
    };

export interface MoveColumnDtoRes {
  id: string;
}
