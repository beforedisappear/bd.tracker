import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  GetHaveAccessToTeamDtoSchema,
  GetHaveAccessToTeamResSchema,
} from './dto';

export const GetHaveAccessToTeamDoc = (bearerAuth: string): RouteConfig => ({
  tags: ['team main'],
  summary: 'Get have access to team',
  method: 'get',
  security: [{ [bearerAuth]: [] }],
  path: '/team/{idOrSlug}/access',
  request: {
    params: GetHaveAccessToTeamDtoSchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: GetHaveAccessToTeamResSchema } },
      description: '',
    },
  },
});
