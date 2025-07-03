import { z } from 'zod';

import { TaskSchema } from 'api/schemes/task';

export const DeleteTaskByIdReqParamsSchema = z.object({
  taskId: z.string().uuid(),
});

export const DeleteTaskByIdResSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
});

export const GetTaskByIdDtoReqParamsSchema = z.object({
  taskId: z.string().uuid(),
});

export const GetTaskByIdDtoResSchema = TaskSchema;
