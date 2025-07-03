import { z } from 'zod';

export const RenameColumnReqBodySchema = z.object({
  name: z.string(),
});

export const RenameColumnReqParamsSchema = z.object({
  columnId: z.string().uuid(),
});

export const RenameColumnResSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
});
