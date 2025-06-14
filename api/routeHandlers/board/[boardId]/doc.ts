import { type RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  DeleteBoardByIdReqParamsSchema,
  GetBoardByIdReqParamsSchema,
  GetBoardByIdResSchema,
} from './dto';

export const GetBoardByIdDoc = (bearerName: string): RouteConfig => ({
  method: 'get',
  path: '/board/{boardId}',
  tags: ['board main'],
  security: [{ [bearerName]: [] }],
  request: {
    params: GetBoardByIdReqParamsSchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: GetBoardByIdResSchema } },
      description: '',
    },
  },
});

export const DeleteBoardByIdDoc = (bearerName: string): RouteConfig => ({
  method: 'delete',
  path: '/board/{boardId}',
  tags: ['board main'],
  security: [{ [bearerName]: [] }],
  request: {
    params: DeleteBoardByIdReqParamsSchema,
  },
  responses: {
    204: {
      description: '',
    },
  },
});
