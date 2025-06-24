import type { User } from '@/entities/User/@x/board';
import type { Color } from './color';
import type { Sticker } from './sticker';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  color: Color;
  isDone: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  startDate: string | null;
  endDate: string | null;
  columnId: string;
  order: number;
  projectId: string;
  assignees: User[];
  stickers: Sticker[];
}

export interface CreateTaskDtoReq {
  title: string;
  columnId: string;
  boardId: string; //for invalidation
  order: number;
}

export type CreateTaskDtoRes = Task;

export type MoveTaskDtoReq = {
  taskId: string;
  order: number;
  columnId?: string;
  boardId: string; // for invalidation
};

export interface MoveTaskDtoRes {
  id: string;
  isNormalized: boolean;
}

export interface DeleteTaskDtoReq {
  taskId: string;
  boardId: string; // for invalidation
}

export type DeleteTaskDtoRes = never;

export interface UpdateTaskDtoReq {
  taskId: string;
  boardId: string; // for invalidation
  title?: string;
  description?: string | null;
  color?: Color;
  isDone?: boolean;
  isArchived?: boolean;
  startDate?: string | null;
  endDate?: string | null;
  assigneeIds?: string[];
  stickerIds?: string[];
}

export type UpdateTaskDtoRes = Task;

export interface GetTaskByIdDtoReq {
  taskId: string;
}

export type GetTaskByIdDtoRes = Task;

export type AssigneesPopoverTriggerDirection = 'leftToRight' | 'rightToLeft';
