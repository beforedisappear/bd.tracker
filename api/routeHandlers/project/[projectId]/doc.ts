import { RouteConfig } from '@asteasolutions/zod-to-openapi';

import {
  DeleteProjectReqParamsSchema,
  DeleteProjectResSchema,
  // GetProjectByIdResSchema,
  // GetProjectByIdReqParamsSchema,
} from './dto';

export const DeleteProjectDoc = (bearerName: string): RouteConfig => ({
  method: 'delete',
  path: '/project/{projectId}',
  tags: ['project main'],
  summary: 'Delete project by id inside team',
  security: [{ [bearerName]: [] }],
  request: {
    params: DeleteProjectReqParamsSchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: DeleteProjectResSchema } },
      description: '',
    },
  },
});

// export const GetProjectByIdDoc = (bearerName: string): RouteConfig => ({
//   method: 'get',
//   path: '/project/{projectId}',
//   tags: ['project main'],
//   summary: 'Get project info by id inside team',
//   security: [{ [bearerName]: [] }],
//   request: {
//     params: GetProjectByIdReqParamsSchema,
//   },
//   responses: {
//     200: {
//       content: { 'application/json': { schema: GetProjectByIdResSchema } },
//       description: '',
//     },
//   },
// });
