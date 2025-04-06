import {
  CreateTeamDataReqSchema,
  CreateTeamDataResSchema,
  DeleteTeamDataReqSchema,
  DeleteTeamDataResSchema,
  GetTeamByIdOrTeamNameDataReqQuerySchema,
  GetTeamByIdOrTeamNameDataResSchema,
} from '$/dto/team.dto';

import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const GetTeamByIdOrSlug = (bearerName: string): RouteConfig => ({
  method: 'get',
  path: '/team',
  tags: ['team'],
  description: 'to get team by id or slug (team name)',
  security: [{ [bearerName]: [] }],
  request: {
    query: GetTeamByIdOrTeamNameDataReqQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': { schema: GetTeamByIdOrTeamNameDataResSchema },
      },
      description: '',
    },
  },
});

export const DeleteTeamDoc = (bearerName: string): RouteConfig => ({
  method: 'delete',
  path: '/team',
  tags: ['team'],
  description: 'to allow the owner to delete his team',
  security: [{ [bearerName]: [] }],
  request: {
    params: DeleteTeamDataReqSchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: DeleteTeamDataResSchema } },
      description: '',
    },
  },
});

export const PostCreateTeamDoc = (bearerName: string): RouteConfig => ({
  method: 'post',
  path: '/team',
  tags: ['team'],
  description: 'to create team by user',
  security: [{ [bearerName]: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: CreateTeamDataReqSchema } },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: CreateTeamDataResSchema } },
      description: '',
    },
  },
});
