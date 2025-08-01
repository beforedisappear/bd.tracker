import { z } from 'zod';

export const MoveColumnReqBodySchema = z.object({
  order: z.number(),
});

export const MoveColumnReqParamsSchema = z.object({
  columnId: z.string().uuid(),
});

export const MoveColumnResSchema = z.object({
  id: z.string().uuid(),
  isNormalized: z.boolean(),
  tenantId: z.string().uuid(),
  newOrder: z.number(),
});
