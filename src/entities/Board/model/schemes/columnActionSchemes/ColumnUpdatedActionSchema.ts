import { z } from 'zod';
import { ColumnActionSchema } from './ColumnActionSchema';

export const ColumnUpdatedActionSchema = z
  .object({ action: z.literal('COLUMN_UPDATED') })
  .merge(ColumnActionSchema);
