import { UserSchemaReq, UserSchemaRes } from './dto';
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

export const UpdateProfileDoc = (bearerName: string): RouteConfig => ({
  method: 'put',
  path: '/profile',
  tags: ['profile'],
  description: 'to update user data',
  security: [{ [bearerName]: [] }],
  request: {
    body: {
      content: {
        'application/json': { schema: UserSchemaReq },
      },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: UserSchemaRes } },
      description: '',
    },
  },
});
