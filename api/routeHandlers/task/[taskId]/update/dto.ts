import { z } from 'zod';

import { TaskSchema } from 'api/schemes/task';
import { Color } from 'config/prisma/generated/client';

export const UpdateTaskDtoReqParamsSchema = z.object({
  taskId: z.string().uuid(),
});

export const UpdateTaskDtoReqBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional().nullable(),
  color: z.nativeEnum(Color).optional(),
  isDone: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  assigneeIds: z.array(z.string().uuid()).optional(),
  stickerIds: z.array(z.string().uuid()).optional(),
});

export const UpdateTaskDtoResSchema = TaskSchema;
