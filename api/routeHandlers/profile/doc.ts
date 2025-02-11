import { UserSchemaRes } from '$/dto/user.dto';
import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const GetProfileDoc = (bearerName: string): RouteConfig => ({
  method: 'get',
  path: '/profile',
  tags: ['profile'],
  description: 'to get user data',
  security: [{ [bearerName]: [] }],
  request: {},
  responses: {
    200: {
      content: { 'application/json': { schema: UserSchemaRes } },
      description: '',
    },
  },
});
