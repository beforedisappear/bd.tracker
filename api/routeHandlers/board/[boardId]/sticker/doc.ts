import {
  GetStickersReqParamsSchema,
  GetStickersResSchema,
  CreateStickerReqParamsSchema,
  CreateStickerReqBodySchema,
  CreateStickerResSchema,
} from './dto';
import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const GetBoardStickersDoc = (bearerName: string): RouteConfig => ({
  method: 'get',
  path: '/board/{boardId}/sticker',
  tags: ['board stickers'],
  security: [{ [bearerName]: [] }],
  request: { params: GetStickersReqParamsSchema },
  responses: {
    200: {
      content: { 'application/json': { schema: GetStickersResSchema } },
      description: '',
    },
  },
});

export const PostCreateStickerDoc = (bearerName: string): RouteConfig => ({
  method: 'post',
  path: '/board/{boardId}/sticker',
  tags: ['board stickers'],
  security: [{ [bearerName]: [] }],
  request: {
    params: CreateStickerReqParamsSchema,
    body: {
      content: { 'application/json': { schema: CreateStickerReqBodySchema } },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: CreateStickerResSchema } },
      description: '',
    },
  },
});
