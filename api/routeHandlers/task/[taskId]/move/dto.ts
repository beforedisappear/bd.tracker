import { z } from 'zod';

export const MoveTaskDtoReqParamsSchema = z.object({
  taskId: z.string().uuid(),
});

export const MoveTaskDtoReqBodySchema = z.object({
  columnId: z.string().uuid(),
  order: z.number(),
});

export const MoveTaskDtoResSchema = z.object({
  id: z.string().uuid(),
});
