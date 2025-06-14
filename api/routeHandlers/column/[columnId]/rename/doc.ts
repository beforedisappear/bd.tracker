import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  RenameColumnReqBodySchema,
  RenameColumnReqParamsSchema,
  RenameColumnResSchema,
} from './dto';

export const PatchRenameColumnDoc = (bearerName: string): RouteConfig => ({
  method: 'patch',
  path: '/column/{columnId}/rename',
  tags: ['column main'],
  security: [{ [bearerName]: [] }],
  request: {
    params: RenameColumnReqParamsSchema,
    body: {
      content: { 'application/json': { schema: RenameColumnReqBodySchema } },
    },
  },
  responses: {
    200: {
      description: '',
      content: { 'application/json': { schema: RenameColumnResSchema } },
    },
  },
});
