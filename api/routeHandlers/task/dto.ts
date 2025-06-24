import { z } from 'zod';
import { TaskSchema } from 'api/schemes/task';

export const CreateTaskReqBodySchema = z.object({
  columnId: z.string(),
  title: z.string(),
  order: z.number(),
});

export const CreateTaskResSchema = TaskSchema;
