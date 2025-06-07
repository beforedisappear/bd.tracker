import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  DeleteColumnByIdReqParamsSchema,
  DeleteColumnByIdResSchema,
} from './dto';

export const DeleteColumnByIdDoc = (bearerName: string): RouteConfig => ({
  method: 'delete',
  path: '/column/{columnId}',
  tags: ['column main'],
  security: [{ [bearerName]: [] }],
  request: {
    params: DeleteColumnByIdReqParamsSchema,
  },
  responses: {
    200: {
      description: '',
      content: { 'application/json': { schema: DeleteColumnByIdResSchema } },
    },
  },
});
