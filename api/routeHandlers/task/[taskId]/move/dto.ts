import { z } from 'zod';

export const MoveTaskDtoReqParamsSchema = z.object({
  taskId: z.string().uuid(),
});

export const MoveTaskDtoReqBodySchema = z.object({
  columnId: z.string().uuid(),
  nextTaskId: z.string().uuid().nullable(),
  previousTaskId: z.string().uuid().nullable(),
});

export const MoveTaskDtoResSchema = z.object({
  id: z.string().uuid(),
});
