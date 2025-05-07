import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  GetProjectMembersReqQuerySchema,
  GetProjectMembersReqParamsSchema,
  GetProjectMembersResSchema,
} from './dto';

export const GetProjectMembersDoc = (bearerName: string): RouteConfig => ({
  method: 'get',
  path: '/project/{projectId}/members',
  tags: ['project members'],
  security: [{ [bearerName]: [] }],
  request: {
    params: GetProjectMembersReqParamsSchema,
    query: GetProjectMembersReqQuerySchema,
  },
  responses: {
    200: {
      description: 'Project members',
      content: { 'application/json': { schema: GetProjectMembersResSchema } },
    },
  },
});
