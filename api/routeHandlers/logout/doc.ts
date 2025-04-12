import { LogoutReqBodySchema } from './dto';

import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const PostLogoutDoc: RouteConfig = {
  method: 'post',
  path: '/logout',
  tags: ['auth'],
  description: 'to logout from profile',
  request: {
    body: {
      content: { 'application/json': { schema: LogoutReqBodySchema } },
    },
  },
  responses: {
    204: {
      description: '',
    },
  },
};
