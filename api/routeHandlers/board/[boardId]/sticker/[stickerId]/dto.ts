import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Color } from 'config/prisma/generated/client';

extendZodWithOpenApi(z);

export const UpdateStickerReqParamsSchema = z.object({
  boardId: z.string().uuid(),
  stickerId: z.string().uuid(),
});

export const UpdateStickerReqBodySchema = z.object({
  name: z.string().optional(),
  color: z.nativeEnum(Color).optional(),
});

export const UpdateStickerResSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.nativeEnum(Color),
  boardId: z.string().uuid(),
  projectId: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const DeleteStickerReqParamsSchema = z.object({
  boardId: z.string().uuid(),
  stickerId: z.string().uuid(),
});

export const DeleteStickerResSchema = z.object({
  id: z.string().uuid(),
});
