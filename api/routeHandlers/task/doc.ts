import { type RouteConfig } from '@asteasolutions/zod-to-openapi';
import { CreateTaskReqBodySchema, CreateTaskResSchema } from './dto';

export const PostCreateTaskDoc = (bearerName: string): RouteConfig => ({
  method: 'post',
  path: '/task',
  tags: ['task main'],
  security: [{ [bearerName]: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: CreateTaskReqBodySchema } },
    },
  },
  responses: {
    200: {
      description: '',
      content: { 'application/json': { schema: CreateTaskResSchema } },
    },
  },
});
