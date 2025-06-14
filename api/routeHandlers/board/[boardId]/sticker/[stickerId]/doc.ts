import {
  UpdateStickerReqParamsSchema,
  UpdateStickerReqBodySchema,
  UpdateStickerResSchema,
  DeleteStickerReqParamsSchema,
  DeleteStickerResSchema,
} from './dto';
import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const PatchUpdateStickerDoc = (bearerName: string): RouteConfig => ({
  method: 'patch',
  path: '/board/{boardId}/sticker/{stickerId}',
  tags: ['board stickers'],
  security: [{ [bearerName]: [] }],
  request: {
    params: UpdateStickerReqParamsSchema,
    body: {
      content: { 'application/json': { schema: UpdateStickerReqBodySchema } },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: UpdateStickerResSchema } },
      description: '',
    },
  },
});

export const DeleteStickerDoc = (bearerName: string): RouteConfig => ({
  method: 'delete',
  path: '/board/{boardId}/sticker/{stickerId}',
  tags: ['board stickers'],
  security: [{ [bearerName]: [] }],
  request: {
    params: DeleteStickerReqParamsSchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: DeleteStickerResSchema } },
      description: '',
    },
  },
});
