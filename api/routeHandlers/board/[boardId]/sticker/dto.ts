import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Color } from 'config/prisma/generated/client';

extendZodWithOpenApi(z);

export const GetStickersReqParamsSchema = z.object({
  boardId: z.string().uuid(),
});

export const GetStickersResSchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    color: z.nativeEnum(Color),
    boardId: z.string().uuid(),
    projectId: z.string().uuid(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
);

export const CreateStickerReqParamsSchema = z.object({
  boardId: z.string().uuid(),
});

export const CreateStickerReqBodySchema = z.object({
  name: z.string(),
  color: z.nativeEnum(Color).optional(),
});

export const CreateStickerResSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.nativeEnum(Color),
  boardId: z.string().uuid(),
  projectId: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
