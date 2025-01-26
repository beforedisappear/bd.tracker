import { AuthDataReqSchema } from '$/dto/auth.dto';

import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const AuthPathDoc: RouteConfig = {
  method: 'post',
  path: '/auth',
  description: 'to get auth data',
  request: {
    body: { content: { email: { schema: AuthDataReqSchema } } },
  },
  responses: {
    204: {
      description: 'No content - successful operation',
    },
  },
};
