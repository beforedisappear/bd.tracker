import { AcceptInvitationToTeamReqBodySchema } from './dto';
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
    body: {
      content: {
        'application/json': {
          schema: AcceptInvitationToTeamReqBodySchema,
        },
      },
    },
  },
  responses: {
    204: {
      content: {},
      description: '',
    },
  },
});
