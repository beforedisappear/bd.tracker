import {
  DeleteTeamByIdOrSlugReqParamsSchema,
  DeleteTeamByIdOrSlugResSchema,
  GetTeamByIdOrSlugReqParamsSchema,
  GetTeamByIdOrSlugResSchema,
} from './dto';

import type { RouteConfig } from '@asteasolutions/zod-to-openapi';

export const GetTeamByIdOrSlugDoc = (bearerName: string): RouteConfig => ({
  method: 'get',
  path: `/team/{idOrSlug}`,
  tags: ['team main'],
  description: 'to get team by id or slug (team name)',
  security: [{ [bearerName]: [] }],
  request: {
    params: GetTeamByIdOrSlugReqParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': { schema: GetTeamByIdOrSlugResSchema },
      },
      description: '',
    },
  },
});

export const DeleteTeamByIdOrSlugDoc = (bearerName: string): RouteConfig => ({
  method: 'delete',
  path: '/team/{idOrSlug}',
  tags: ['team main'],
  description: 'to allow the owner to delete his team by id',
  security: [{ [bearerName]: [] }],
  request: {
    params: DeleteTeamByIdOrSlugReqParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': { schema: DeleteTeamByIdOrSlugResSchema },
      },
      description: '',
    },
  },
});
