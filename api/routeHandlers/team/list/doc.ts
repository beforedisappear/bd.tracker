import { TeamListDataResSchema } from '$/dto/team.dto';

import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const GetTeamListDoc = (bearerName: string): RouteConfig => ({
  method: 'get',
  path: '/team/list',
  tags: ['team'],
  description: `to get list of user teams (as an owner and member)`,
  security: [{ [bearerName]: [] }],
  request: {},
  responses: {
    200: {
      content: { 'application/json': { schema: TeamListDataResSchema } },
      description: '',
    },
  },
});
