import { z } from 'zod';

export const DeleteColumnByIdReqParamsSchema = z.object({
  columnId: z.string().uuid(),
});

export const DeleteColumnByIdResSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  boardId: z.string().uuid(),
});
