import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { MoveTaskDtoReqBodySchema, MoveTaskDtoResSchema } from './dto';

export const PatchMoveTaskDoc = (bearerName: string): RouteConfig => ({
  method: 'patch',
  path: '/task/{taskId}/move',
  tags: ['task main'],
  security: [{ [bearerName]: [] }],
  request: { params: MoveTaskDtoReqBodySchema },
  responses: {
    200: {
      description: '',
      content: { 'application/json': { schema: MoveTaskDtoResSchema } },
    },
  },
});
