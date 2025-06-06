import { z } from 'zod';

export const MoveTaskDtoReqBodySchema = z.object({
  taskId: z.string().uuid(),
  columnId: z.string().uuid(),
  nextTaskId: z.string().uuid().nullable(),
  previousTaskId: z.string().uuid().nullable(),
});

export const MoveTaskDtoResSchema = z.object({
  id: z.string().uuid(),
});
