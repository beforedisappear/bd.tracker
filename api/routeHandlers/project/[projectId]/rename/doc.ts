import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  RenameProjectReqBodySchema,
  RenameProjectReqParamsSchema,
  RenameProjectResSchema,
} from './dto';

export const PatchProjectRenameDoc = (bearerName: string): RouteConfig => ({
  method: 'patch',
  path: '/project/{projectId}/rename',
  tags: ['project main'],
  security: [{ [bearerName]: [] }],
  request: {
    params: RenameProjectReqParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: RenameProjectReqBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: RenameProjectResSchema,
        },
      },
      description: '',
    },
  },
});
