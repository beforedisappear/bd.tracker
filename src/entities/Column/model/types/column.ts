import type { Task } from '@/entities/Task/@x/column';

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
