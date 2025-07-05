import { z } from 'zod';

export const BoardSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  name: z.string(),
  projectId: z.string(),
  createdAt: z.string(),
  columnMoveCount: z.number(),
});
