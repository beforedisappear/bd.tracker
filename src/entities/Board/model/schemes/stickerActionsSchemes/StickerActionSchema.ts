import { z } from 'zod';

export const StickerActionSchema = z.object({
  type: z.literal('message'),
  tenantId: z.string(),
  initiatorId: z.string(),
  data: z.any(),
});
