import { LoginReqBodySchema, LoginResSchema } from './dto';

import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const PostLoginDoc: RouteConfig = {
  method: 'post',
  path: '/login',
  tags: ['auth'],
  description: 'to send auth code on email',
  request: {
    body: { content: { 'application/json': { schema: LoginReqBodySchema } } },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: LoginResSchema } },
      description: '',
    },
  },
};
