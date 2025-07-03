import { z } from 'zod';

import { ColumnActionSchema } from './ColumnActionSchema';

export const ColumnMovedActionSchema = z
  .object({ action: z.literal('COLUMN_MOVED') })
  .merge(ColumnActionSchema);
