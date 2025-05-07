import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { RemoveProjectMemberReqParamsSchema } from './dto';

export const DeleteProjectMemberDoc = (bearerAuth: string): RouteConfig => ({
  tags: ['project members'],
  summary: 'Remove a member from a project',
  path: '/project/{projectId}/members/{memberId}',
  security: [{ [bearerAuth]: [] }],
  method: 'delete',
  request: {
    params: RemoveProjectMemberReqParamsSchema,
  },
  responses: {
    204: { description: 'Member removed from project' },
  },
});
