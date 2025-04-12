import {
  CreateTeamReqBodySchema,
  CreateTeamResSchema,
  TeamListResSchema,
} from '$/dto/team.dto';

import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const PostCreateTeamDoc = (bearerName: string): RouteConfig => ({
  method: 'post',
  path: '/team',
  tags: ['team main'],
  description: 'to create team by user',
  security: [{ [bearerName]: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: CreateTeamReqBodySchema } },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: CreateTeamResSchema } },
      description: '',
    },
  },
});

export const GetTeamListDoc = (bearerName: string): RouteConfig => ({
  method: 'get',
  path: '/team',
  tags: ['team main'],
  description: `to get list of user teams (as an owner and member)`,
  security: [{ [bearerName]: [] }],
  request: {},
  responses: {
    200: {
      content: { 'application/json': { schema: TeamListResSchema } },
      description: '',
    },
  },
});
