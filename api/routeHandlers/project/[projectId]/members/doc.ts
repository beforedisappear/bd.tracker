import type { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  GetProjectMembersReqQuerySchema,
  GetProjectMembersReqParamsSchema,
  GetProjectMembersResSchema,
  PostAddProjectMemberReqBodySchema,
  PostAddProjectMemberReqParamsSchema,
} from './dto';

export const GetProjectMembersDoc = (bearerName: string): RouteConfig => ({
  method: 'get',
  path: '/project/{projectId}/members',
  tags: ['project members'],
  security: [{ [bearerName]: [] }],
  summary: 'Get all project members',
  request: {
    params: GetProjectMembersReqParamsSchema,
    query: GetProjectMembersReqQuerySchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: GetProjectMembersResSchema } },
      description: '',
    },
  },
});

export const PostAddProjectMemberDoc = (bearerName: string): RouteConfig => ({
  method: 'post',
  path: '/project/{projectId}/members',
  tags: ['project members'],
  summary: 'Add new project member',
  security: [{ [bearerName]: [] }],
  request: {
    params: PostAddProjectMemberReqParamsSchema,
    body: {
      content: {
        'application/json': { schema: PostAddProjectMemberReqBodySchema },
      },
    },
  },
  responses: {
    204: { description: '' },
  },
});
