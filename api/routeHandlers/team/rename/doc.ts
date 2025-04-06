import {
  RenameTeamDataReqQuerySchema,
  RenameTeamDataReqSchema,
} from '$/dto/team.dto';

import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const PatchTeamRenameDoc = (bearerName: string): RouteConfig => ({
  method: 'patch',
  path: '/team/rename',
  tags: ['team'],
  description: 'to rename team',
  security: [{ [bearerName]: [] }],
  request: {
    query: RenameTeamDataReqQuerySchema,
    body: {
      content: { 'application/json': { schema: RenameTeamDataReqSchema } },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: RenameTeamDataReqSchema } },
      description: '',
    },
  },
});
