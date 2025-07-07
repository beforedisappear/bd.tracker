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
  authorId: string;
  assignees: User[];
  stickers: Sticker[];
}

export interface TaskExtended extends Task {
  author: User;
}

export interface CreateTaskDtoReq {
  title: string;
  columnId: string;
  boardId: string; //for invalidation
  order: number;
}

export type CreateTaskDtoRes = Task;

export type MoveTaskDtoReq = {
  id: string;
  columnId: string;
  order: number;
  boardId: string; // for invalidation
};

export interface MoveTaskDtoRes {
  id: string;
  columnId: string;
  newOrder: number;
  isNormalized: boolean;
  tenantId: string;
}

export interface DeleteTaskDtoReq {
  id: string;
  boardId: string; // for invalidation
}

export type DeleteTaskDtoRes = {
  id: string;
  tenantId: string;
};

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

export type GetTaskByIdDtoRes = TaskExtended;

export type AssigneesPopoverTriggerDirection = 'leftToRight' | 'rightToLeft';
