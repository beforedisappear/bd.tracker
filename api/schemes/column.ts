import { z } from 'zod';

export const ColumnSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  order: z.number(),
  taskMoveCount: z.number(),
  boardId: z.string(),
  projectId: z.string(),
  tenantId: z.string(),
});
