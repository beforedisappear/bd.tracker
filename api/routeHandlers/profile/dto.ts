import { z } from 'zod';

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const UserSchemaRes = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).nullable(),
  email: z.string().email(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const UserSchemaReq = z.object({
  name: z.string().min(1),
});
