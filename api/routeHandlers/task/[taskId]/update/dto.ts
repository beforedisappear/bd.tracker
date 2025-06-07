import { Color } from 'config/prisma/generated/client';
import { z } from 'zod';

export const UpdateTaskDtoReqParamsSchema = z.object({
  id: z.string().uuid(),
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

export const UpdateTaskDtoResSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  color: z.nativeEnum(Color),
  isDone: z.boolean(),
  isArchived: z.boolean(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  columnId: z.string().uuid(),
  nextTaskId: z.string().uuid().nullable(),
  projectId: z.string().uuid(),
  assignees: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string().email(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  ),
  stickers: z.array(z.object({})),
  previousTask: z.object({ id: z.string().uuid() }).nullable(),
});
