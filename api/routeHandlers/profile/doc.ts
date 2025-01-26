import { UserSchemaRes } from '$/dto/user.dto';
import { bearerAuth } from '&/swagger/swagger.config';
import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const GetProfileDoc: RouteConfig = {
  method: 'get',
  path: '/profile',
  tags: ['profile'],
  description: 'to get user data',
  security: [{ [bearerAuth.name]: [] }],
  request: {},
  responses: {
    200: {
      content: { 'application/json': { schema: UserSchemaRes } },
      description: '',
    },
  },
};
