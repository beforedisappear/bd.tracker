import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  DeleteTaskByIdReqParamsSchema,
  DeleteTaskByIdResSchema,
  GetTaskByIdDtoReqParamsSchema,
  GetTaskByIdDtoResSchema,
} from './dto';

export const DeleteTaskByIdDoc = (bearerName: string): RouteConfig => ({
  method: 'delete',
  path: '/task/{taskId}',
  tags: ['task main'],
  security: [{ [bearerName]: [] }],
  request: { params: DeleteTaskByIdReqParamsSchema },
  responses: {
    200: {
      description: '',
      content: { 'application/json': { schema: DeleteTaskByIdResSchema } },
    },
  },
});

export const GetTaskByIdDoc = (bearerName: string): RouteConfig => ({
  method: 'get',
  path: '/task/{taskId}',
  tags: ['task main'],
  security: [{ [bearerName]: [] }],
  request: {
    params: GetTaskByIdDtoReqParamsSchema,
  },
  responses: {
    200: {
      description: '',
      content: { 'application/json': { schema: GetTaskByIdDtoResSchema } },
    },
  },
});
