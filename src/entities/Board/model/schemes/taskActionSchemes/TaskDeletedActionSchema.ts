import { z } from 'zod';

import { TaskActionSchema } from './TaskActionSchema';

export const TaskDeletedActionSchema = z
  .object({ action: z.literal('TASK_DELETED') })
  .merge(TaskActionSchema);
