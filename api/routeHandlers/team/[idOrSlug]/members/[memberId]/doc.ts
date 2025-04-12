import {
  GetTeamMemberByIdReqParamsSchema,
  GetTeamMemberByIdResSchema,
  RemoveTeamMemberByIdReqParamsSchema,
} from '$/dto/team.dto';
import { RouteConfig } from '@asteasolutions/zod-to-openapi';

export const GetTeamMemberByIdDoc = (bearerName: string): RouteConfig => ({
  method: 'get',
  path: `/team/{idOrSlug}/members/{memberId}`,
  tags: ['team member'],
  description: 'to get team member',
  security: [{ [bearerName]: [] }],
  request: {
    params: GetTeamMemberByIdReqParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': { schema: GetTeamMemberByIdResSchema },
      },
      description: '',
    },
  },
});

export const RemoveTeamMemberByIdDoc = (bearerName: string): RouteConfig => ({
  method: 'delete',
  path: `/team/{idOrSlug}/members/{memberId}`,
  tags: ['team member'],
  description: 'to remove member by id from team',
  security: [{ [bearerName]: [] }],
  request: {
    params: RemoveTeamMemberByIdReqParamsSchema,
  },
  responses: {
    204: {
      content: {},
      description: '',
    },
  },
});
