// import type { Color } from 'config/prisma/generated/client';

import { z } from 'zod';

export const CreateTaskReqBodySchema = z.object({
  columnId: z.string(),
  title: z.string(),
});

export const CreateTaskResSchema = z.object({
  id: z.string(),
  title: z.string(),
  columnId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  // TODO: add
});
