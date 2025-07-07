import { z } from 'zod';

import { TaskActionSchema } from './TaskActionSchema';

export const TaskUpdatedActionSchema = z
  .object({ action: z.literal('TASK_UPDATED') })
  .merge(TaskActionSchema);
