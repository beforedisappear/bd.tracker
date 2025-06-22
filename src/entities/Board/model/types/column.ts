import type { Task } from './task';

export interface Column {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  boardId: string;
  order: number;
  tasks: Task[];
  projectId: string;
}

export interface CreateColumnDtoReq {
  name: string;
  boardId: string;
  order: number;
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

export type MoveColumnDtoReq = {
  columnId: string;
  order: number;
};

export interface MoveColumnDtoRes {
  id: string;
}
