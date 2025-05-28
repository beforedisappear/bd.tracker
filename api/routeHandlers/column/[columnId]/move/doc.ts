import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  MoveColumnReqBodySchema,
  MoveColumnReqParamsSchema,
  MoveColumnResSchema,
} from './dto';

export const PatchMoveColumnDoc = (bearerName: string): RouteConfig => ({
  method: 'patch',
  path: '/column/{columnId}/move',
  tags: ['column main'],
  security: [{ [bearerName]: [] }],
  request: {
    params: MoveColumnReqParamsSchema,
    body: {
      content: { 'application/json': { schema: MoveColumnReqBodySchema } },
    },
  },
  responses: {
    200: {
      description: '',
      content: { 'application/json': { schema: MoveColumnResSchema } },
    },
  },
});
