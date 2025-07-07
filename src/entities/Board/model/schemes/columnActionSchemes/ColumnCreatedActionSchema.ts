import { z } from 'zod';
import { ColumnActionSchema } from './ColumnActionSchema';

export const ColumnCreatedActionSchema = z
  .object({ action: z.literal('COLUMN_CREATED') })
  .merge(ColumnActionSchema);
