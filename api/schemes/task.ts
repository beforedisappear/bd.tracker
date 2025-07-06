import { Color } from 'config/prisma/generated/client';
import { z } from 'zod';

import { UserSchema } from './user';
import { StickerSchema } from './sticker';

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
  authorId: z.string().uuid(),
  author: UserSchema,
  assignees: z.array(UserSchema),
  stickers: z.array(StickerSchema),
});
