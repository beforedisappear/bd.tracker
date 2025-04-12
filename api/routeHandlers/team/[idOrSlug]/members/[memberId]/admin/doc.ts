import {
  RemoveTeamAdminReqParamsSchema,
  SetTeamAdminReqParamsSchema,
} from './dto';
import { RouteConfig } from '@asteasolutions/zod-to-openapi';

export const PatchSetTeamAdminDoc = (bearerName: string): RouteConfig => ({
  method: 'patch',
  path: `/team/{idOrSlug}/members/{memberId}/admin`,
  tags: ['team admin'],
  description: 'to appoint a team member as an administrator',
  security: [{ [bearerName]: [] }],
  request: {
    params: SetTeamAdminReqParamsSchema,
  },
  responses: {
    204: {
      content: {},
      description: '',
    },
  },
});

export const DeleteRemoveTeamAdminDoc = (bearerName: string): RouteConfig => ({
  method: 'delete',
  path: `/team/{idOrSlug}/members/{memberId}/admin`,
  tags: ['team admin'],
  description: 'to remove a team member from the position of administrator',
  security: [{ [bearerName]: [] }],
  request: {
    params: RemoveTeamAdminReqParamsSchema,
  },
  responses: {
    204: {
      content: {},
      description: '',
    },
  },
});
