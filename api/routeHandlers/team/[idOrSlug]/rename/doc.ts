import {
  RenameTeamResSchema,
  RenameTeamByIdOrSlugReqBodySchema,
  RenameTeamByIdOrSlugReqParamsSchema,
} from './dto';

import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const PatchTeamRenameByIdOrSlugDoc = (
  bearerName: string,
): RouteConfig => ({
  method: 'patch',
  path: '/team/{idOrSlug}/rename',
  tags: ['team main'],
  description: 'to rename team by id or slug',
  security: [{ [bearerName]: [] }],
  request: {
    params: RenameTeamByIdOrSlugReqParamsSchema,
    body: {
      content: {
        'application/json': { schema: RenameTeamByIdOrSlugReqBodySchema },
      },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: RenameTeamResSchema } },
      description: '',
    },
  },
});
