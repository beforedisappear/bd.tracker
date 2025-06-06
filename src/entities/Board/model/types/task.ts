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
  nextTaskId: string | null;
  projectId: string;
  assignees: User[];
  stickers: Sticker[];
  previousTask: { id: string } | null;
}

export interface CreateTaskDtoReq {
  title: string;
  columnId: string;
  boardId: string; //for invalidation
}

export type CreateTaskDtoRes = Task;

export type MoveTaskDtoReq =
  | { nextTaskId: string; previousTaskId: null; taskId: string }
  | { nextTaskId: null; previousTaskId: string; taskId: string };

export interface MoveTaskDtoRes {
  id: string;
}

export interface DeleteTaskDtoReq {
  taskId: string;
}

export type DeleteTaskDtoRes = never;

export interface UpdateTaskDtoReq {
  taskId: string;
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
