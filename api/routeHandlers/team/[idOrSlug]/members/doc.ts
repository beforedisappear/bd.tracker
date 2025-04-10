import {
  DeleteMemberFromTeamReqBodySchema,
  DeleteMemberFromTeamReqParamsSchema,
  GetTeamMembersReqParamsSchema,
  GetTeamMembersResSchema,
} from '$/dto/team.dto';
import type { RouteConfig } from '@asteasolutions/zod-to-openapi';

export const GetTeamMembersDoc = (bearerName: string): RouteConfig => ({
  method: 'get',
  path: `/team/{idOrSlug}/members`,
  tags: ['team'],
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

export const DeleteMemberFromTeamDoc = (bearerName: string): RouteConfig => ({
  method: 'delete',
  path: `/team/{idOrSlug}/members`,
  tags: ['team'],
  description: 'to remove member from team',
  security: [{ [bearerName]: [] }],
  request: {
    params: DeleteMemberFromTeamReqParamsSchema,
    body: {
      content: {
        'application/json': { schema: DeleteMemberFromTeamReqBodySchema },
      },
    },
  },
  responses: {
    200: {
      content: {},
      description: '',
    },
  },
});
