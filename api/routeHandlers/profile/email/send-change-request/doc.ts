import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { PostSendChangeEmailReqBodySchema } from './dto';

export const PostSendChangeEmailDoc = (bearerAuth: string): RouteConfig => ({
  tags: ['profile'],
  method: 'post',
  path: '/profile/email/send-change-request',
  summary: 'Send request to change your email',
  security: [{ [bearerAuth]: [] }],
  request: {
    body: {
      content: {
        'application/json': { schema: PostSendChangeEmailReqBodySchema },
      },
    },
  },
  responses: {
    204: {
      description: '',
    },
  },
});
