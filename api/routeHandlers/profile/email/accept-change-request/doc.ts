import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { PostAcceptChangeEmailReqBodySchema } from './dto';

export const PostAcceptChangeEmailDoc: RouteConfig = {
  tags: ['profile'],
  method: 'post',
  path: '/profile/email/accept-change-request',
  summary: 'Confirm change email request',
  request: {
    body: {
      content: {
        'application/json': {
          schema: PostAcceptChangeEmailReqBodySchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Accepted',
    },
  },
};
