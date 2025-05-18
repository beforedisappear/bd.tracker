import {
  CheckInvitationExistsReqQuerySchema,
  CheckInvitationExistsReqParamsSchema,
  CheckInvitationExistsResSchema,
} from './dto';
import type { RouteConfig } from '@asteasolutions/zod-to-openapi';

export const GetCheckInvitationExistsDoc = (
  bearerName: string,
): RouteConfig => ({
  method: 'get',
  path: `/team/{idOrSlug}/invitation/check`,
  tags: ['team invitation'],
  description: 'to check if an invitation exists by invitee email',
  security: [{ [bearerName]: [] }],
  request: {
    params: CheckInvitationExistsReqParamsSchema,
    query: CheckInvitationExistsReqQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': { schema: CheckInvitationExistsResSchema },
      },
      description: '',
    },
  },
});
