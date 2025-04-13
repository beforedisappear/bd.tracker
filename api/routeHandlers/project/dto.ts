import { z } from 'zod';

export const CreateProjectReqBodySchema = z.object({
  teamId: z.string().uuid(),
  name: z.string(),
  memberIds: z.array(z.string()).optional(),
});

export const CreateProjectResSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  name: z.string(),
  createdAt: z.string(),
});
