import { type RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  CreateBoardReqBodySchema,
  CreateBoardResSchema,
  GetProjectBoardsReqQuerySchema,
  GetProjectBoardsResSchema,
} from './dto';

export const PostCreateBoardDoc = (bearerName: string): RouteConfig => ({
  method: 'post',
  path: '/board',
  tags: ['board main'],
  description: 'to create board inside project',
  security: [{ [bearerName]: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: CreateBoardReqBodySchema } },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: CreateBoardResSchema } },
      description: '',
    },
  },
});

export const GetProjectBoardsDoc = (bearerName: string): RouteConfig => ({
  method: 'get',
  path: '/board',
  tags: ['board main'],
  security: [{ [bearerName]: [] }],
  request: {
    query: GetProjectBoardsReqQuerySchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: GetProjectBoardsResSchema } },
      description: '',
    },
  },
});
