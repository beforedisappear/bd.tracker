import { RouteConfig } from '@asteasolutions/zod-to-openapi';

import {
  UpdateTaskDtoReqBodySchema,
  UpdateTaskDtoReqParamsSchema,
  UpdateTaskDtoResSchema,
} from './dto';

export const PatchUpdateTaskDoc = (bearerName: string): RouteConfig => ({
  method: 'patch',
  path: '/task/{taskId}/update',
  tags: ['task main'],
  security: [{ [bearerName]: [] }],
  request: {
    params: UpdateTaskDtoReqParamsSchema,
    body: {
      content: { 'application/json': { schema: UpdateTaskDtoReqBodySchema } },
    },
  },
  responses: {
    200: {
      description: '',
      content: { 'application/json': { schema: UpdateTaskDtoResSchema } },
    },
  },
});
