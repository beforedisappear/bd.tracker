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
