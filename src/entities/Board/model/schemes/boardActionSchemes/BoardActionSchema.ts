import { z } from 'zod';

export const BoardActionSchema = z.object({
  type: z.literal('message'),
  tenantId: z.string(),
  initiatorId: z.string(),
  data: z.any(),
});
