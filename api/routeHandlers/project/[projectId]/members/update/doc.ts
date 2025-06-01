import type { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  UpdateProjectMembersReqParamsSchema,
  UpdateProjectMembersReqBodySchema,
} from './dto';

export const PostUpdateProjectMembersDoc = (
  bearerAuth: string,
): RouteConfig => ({
  tags: ['project members'],
  method: 'post',
  path: '/project/{projectId}/members/update',
  security: [{ [bearerAuth]: [] }],
  request: {
    params: UpdateProjectMembersReqParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateProjectMembersReqBodySchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Project members updated',
    },
  },
});
