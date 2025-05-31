import { z } from 'zod';

export const DeleteColumnByIdReqParamsSchema = z.object({
  columnId: z.string(),
});

export const DeleteColumnByIdResSchema = z.object({
  id: z.string(),
});
