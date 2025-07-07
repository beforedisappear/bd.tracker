import { z } from 'zod';

import { Color } from 'config/prisma/generated/client';

export const StickerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.nativeEnum(Color),
  createdAt: z.string(),
  updatedAt: z.string(),
  boardId: z.string().uuid(),
  projectId: z.string().uuid(),
  tenantId: z.string().uuid(),
});
