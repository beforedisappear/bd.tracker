import { TaskSchema } from 'api/schemes/task';
import { z } from 'zod';

export const GetBoardByIdReqParamsSchema = z.object({
  boardId: z.string(),
});

export const GetBoardByIdResSchema = z.object({
  id: z.string(),
  name: z.string(),
  projectId: z.string(),
  createdAt: z.string(),
  columns: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      boardId: z.string().uuid(),
      nextColumnId: z.string().uuid().nullable(),
      projectId: z.string().uuid(),
      tasks: z.array(TaskSchema),
      previousColumnId: z.object({
        id: z.string().uuid(),
      }),
    }),
  ),
});

export const DeleteBoardByIdReqParamsSchema = z.object({
  boardId: z.string(),
});
