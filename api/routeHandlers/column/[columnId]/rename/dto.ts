import { z } from 'zod';
import { ColumnSchema } from 'api/schemes/column';

export const RenameColumnReqBodySchema = z.object({
  name: z.string(),
});

export const RenameColumnReqParamsSchema = z.object({
  columnId: z.string().uuid(),
});

export const RenameColumnResSchema = ColumnSchema;
