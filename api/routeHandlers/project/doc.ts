import {
  CreateProjectReqBodySchema,
  CreateProjectResSchema,
  GetAllProjectsResSchema,
  GetAllTeamProjectsReqQuerySchema,
} from './dto';

import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export const PostCreateProjectDoc = (bearerName: string): RouteConfig => ({
  method: 'post',
  path: '/project',
  tags: ['project main'],
  description: 'to create project inside team',
  security: [{ [bearerName]: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: CreateProjectReqBodySchema } },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: CreateProjectResSchema } },
      description: '',
    },
  },
});

export const GetAllTeamProjectsDoc = (bearerName: string): RouteConfig => ({
  method: 'get',
  path: '/project',
  tags: ['project main'],
  description: 'to get all projects inside team',
  security: [{ [bearerName]: [] }],
  request: {
    query: GetAllTeamProjectsReqQuerySchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: GetAllProjectsResSchema } },
      description: '',
    },
  },
});
