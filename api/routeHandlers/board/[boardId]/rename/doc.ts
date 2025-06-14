import { type RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  RenameBoardDtoBodyReq,
  RenameBoardDtoReqParams,
  RenameBoardDtoRes,
} from './dto';

export const PatchRenameBoardDoc = (bearerName: string): RouteConfig => ({
  method: 'patch',
  path: '/board/{boardId}/rename',
  tags: ['board main'],
  security: [{ [bearerName]: [] }],
  request: {
    params: RenameBoardDtoReqParams,
    body: {
      content: {
        'application/json': {
          schema: RenameBoardDtoBodyReq,
        },
      },
    },
  },
  responses: {
    200: {
      description: '',
      content: {
        'application/json': {
          schema: RenameBoardDtoRes,
        },
      },
    },
  },
});
