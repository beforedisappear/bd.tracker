import { type RouteConfig } from '@asteasolutions/zod-to-openapi';
import { CreateColumnReqBodySchema, CreateColumnResSchema } from './dto';

export const PostCreateColumnDoc = (bearerName: string): RouteConfig => ({
  method: 'post',
  path: '/column',
  tags: ['column main'],
  security: [{ [bearerName]: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: CreateColumnReqBodySchema } },
    },
  },
  responses: {
    200: {
      description: '',
      content: { 'application/json': { schema: CreateColumnResSchema } },
    },
  },
});
