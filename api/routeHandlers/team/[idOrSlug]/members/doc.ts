import { GetTeamMembersReqParamsSchema, GetTeamMembersResSchema } from './dto';
import type { RouteConfig } from '@asteasolutions/zod-to-openapi';

export const GetTeamMembersDoc = (bearerName: string): RouteConfig => ({
  method: 'get',
  path: `/team/{idOrSlug}/members`,
  tags: ['team member'],
  description: 'to get full team member list',
  security: [{ [bearerName]: [] }],
  request: {
    params: GetTeamMembersReqParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': { schema: GetTeamMembersResSchema },
      },
      description: '',
    },
  },
});
