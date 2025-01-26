import { z } from 'zod';

export const UserSchemaRes = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).nullable(),
  email: z.string().email(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
