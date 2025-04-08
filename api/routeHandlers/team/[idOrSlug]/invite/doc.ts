import {
  InviteUserToTeamReqBodySchema,
  InviteUserToTeamReqParamsSchema,
  InviteUserToTeamResSchema,
} from '$/dto/team.dto';
import type { RouteConfig } from '@asteasolutions/zod-to-openapi';

export const PostInviteUserToTeamDoc = (bearerName: string): RouteConfig => ({
  method: 'post',
  path: `/team/{idOrSlug}/invite`,
  tags: ['team'],
  description: 'to invite user to team by id or slug',
  security: [{ [bearerName]: [] }],
  request: {
    params: InviteUserToTeamReqParamsSchema,
    body: {
      content: {
        'application/json': { schema: InviteUserToTeamReqBodySchema },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': { schema: InviteUserToTeamResSchema },
      },
      description: '',
    },
  },
});
