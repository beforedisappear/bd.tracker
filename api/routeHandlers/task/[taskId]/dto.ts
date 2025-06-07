import { z } from 'zod';

export const DeleteTaskByIdReqParamsSchema = z.object({
  taskId: z.string().uuid(),
});

export const DeleteTaskByIdResSchema = z.object({
  id: z.string().uuid(),
});
