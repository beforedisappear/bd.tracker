import { RefreshTokensReqSchema, RefreshTokensResSchema } from './dto';

import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const PostRefreshTokensDoc: RouteConfig = {
  method: 'post',
  path: '/refresh-tokens',
  tags: ['auth'],
  description: 'to rotate tokens',
  request: {
    body: {
      content: { 'application/json': { schema: RefreshTokensReqSchema } },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: RefreshTokensResSchema } },
      description: '',
    },
  },
};
