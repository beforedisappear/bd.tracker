import { LoginDataReqSchema, LoginDataResSchema } from '$/dto/auth.dto';

import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const LoginPath: RouteConfig = {
  method: 'post',
  path: '/login',
  description: 'to send auth code on email',
  request: {
    body: { content: { 'application/json': { schema: LoginDataReqSchema } } },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: LoginDataResSchema } },
      description: '',
    },
  },
};
