import { z } from 'zod';

export const CreateColumnReqBodySchema = z.object({
  boardId: z.string(),
  name: z.string(),
});

export const CreateColumnResSchema = z.object({
  id: z.string(),
  name: z.string(),
  boardId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  nextColumnId: z.string().nullable(),
  projectId: z.string(),
});
