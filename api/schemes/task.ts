import { Color } from 'config/prisma/generated/client';
import { z } from 'zod';

export const TaskSchema = z.object({
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
  projectId: z.string().uuid(),
  order: z.number(),
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
});
