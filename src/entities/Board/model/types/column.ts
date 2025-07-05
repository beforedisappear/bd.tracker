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

export type DeleteColumnDtoRes = {
  id: string;
  tenantId: string;
};

export interface RenameColumnDtoReq {
  id: string;
  name: string;
  boardId: string; // for invalidation
}

export interface RenameColumnDtoRes {
  id: string;
  tenantId: string;
}

export type MoveColumnDtoReq = {
  boardId: string;
  columnId: string;
  order: number;
};

export interface MoveColumnDtoRes {
  id: string;
  tenantId: string;
  newOrder: number;
  isNormalized: boolean;
}
