import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Color } from 'config/prisma/generated/client';
import { StickerSchema } from 'api/schemes/sticker';

extendZodWithOpenApi(z);

export const UpdateStickerReqParamsSchema = z.object({
  boardId: z.string().uuid(),
  stickerId: z.string().uuid(),
});

export const UpdateStickerReqBodySchema = z.object({
  name: z.string().optional(),
  color: z.nativeEnum(Color).optional(),
});

export const UpdateStickerResSchema = StickerSchema;

export const DeleteStickerReqParamsSchema = z.object({
  boardId: z.string().uuid(),
  stickerId: z.string().uuid(),
});

export const DeleteStickerResSchema = StickerSchema;
