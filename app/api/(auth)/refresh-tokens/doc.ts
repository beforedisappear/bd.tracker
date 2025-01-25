import { RefreshTokensReqSchema, RefreshTokensResSchema } from '$/dto/auth.dto';

import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const RefreshTokenPath: RouteConfig = {
  method: 'post',
  path: '/refresh-tokens',
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
