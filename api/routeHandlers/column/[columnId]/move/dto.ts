import { z } from 'zod';

export const MoveColumnReqBodySchema = z.object({
  nextColumnId: z.string().nullable(),
  previousColumnId: z.string().nullable(),
});

export const MoveColumnReqParamsSchema = z.object({
  columnId: z.string().uuid(),
});

export const MoveColumnResSchema = z.object({
  id: z.string().uuid(),
});
