import { z } from 'zod';
import { ColumnActionSchema } from './ColumnActionSchema';

export const ColumnDeletedActionSchema = z
  .object({ action: z.literal('COLUMN_DELETED') })
  .merge(ColumnActionSchema);
