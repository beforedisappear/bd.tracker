import { z } from 'zod';

import { TaskActionSchema } from './TaskActionSchema';

export const TaskMovedActionSchema = z
  .object({ action: z.literal('TASK_MOVED') })
  .merge(TaskActionSchema);
