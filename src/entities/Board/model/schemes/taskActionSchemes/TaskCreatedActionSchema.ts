import { z } from 'zod';

import { TaskActionSchema } from './TaskActionSchema';

export const TaskCreatedActionSchema = z
  .object({ action: z.literal('TASK_CREATED') })
  .merge(TaskActionSchema);
