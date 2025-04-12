import { AcceptInvitationToTeamReqQuerySchema } from '$/dto/team.dto';
import type { RouteConfig } from '@asteasolutions/zod-to-openapi';

export const PostAcceptInvitationToTeamDoc = (
  bearerName: string,
): RouteConfig => ({
  method: 'post',
  path: `/team/accept-invitation`,
  tags: ['team invitation'],
  description: 'to accept invitation (from email)',
  security: [{ [bearerName]: [] }],
  request: {
    params: AcceptInvitationToTeamReqQuerySchema,
  },
  responses: {
    204: {
      content: {},
      description: '',
    },
  },
});
