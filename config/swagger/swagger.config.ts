import { z } from 'zod';

import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';

import { AuthPath } from '#/api/(auth)/auth/doc';
import { LoginPath } from '#/api/(auth)/login/doc';
import { RefreshTokenPath } from '#/api/(auth)/refresh-tokens/doc';
import { LogoutPath } from '#/api/(auth)/logout/doc';

// const UserIdSchema = openAPIRegistry.registerParameter(
//   'UserId',
//   z.string().openapi({
//     param: {
//       name: 'id',
//       in: 'path',
//     },
//     example: '1212121',
//   }),
// );

// const UserSchema = z
//   .object({
//     id: z.string().openapi({
//       example: '1212121',
//     }),
//     name: z.string().openapi({
//       example: 'John Doe',
//     }),
//     age: z.number().openapi({
//       example: 42,
//     }),
//   })
//   .openapi('User');

// const bearerAuth = openAPIRegistry.registerComponent(
//   'securitySchemes',
//   'bearerAuth',
//   {
//     type: 'http',
//     scheme: 'bearer',
//     bearerFormat: 'JWT',
//   },
// );

// openAPIRegistry.registerPath({
//   method: 'get',
//   path: '/users/{id}',
//   description: 'Get user data by its id',
//   summary: 'Get a single user',
//   security: [{ [bearerAuth.name]: [] }],
//   request: {
//     params: z.object({ id: UserIdSchema }),
//   },
//   responses: {
//     200: {
//       description: 'Object with user data.',
//       content: {
//         'application/json': {
//           schema: UserSchema,
//         },
//       },
//     },
//     204: {
//       description: 'No content - successful operation',
//     },
//   },
// });

extendZodWithOpenApi(z);

const openAPIRegistry = new OpenAPIRegistry();

openAPIRegistry.registerPath(AuthPath);
openAPIRegistry.registerPath(LoginPath);
openAPIRegistry.registerPath(RefreshTokenPath);
openAPIRegistry.registerPath(LogoutPath);

function getOpenApiDocumentation() {
  const generator = new OpenApiGeneratorV3(openAPIRegistry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '0.0.1',
      title: 'BD.tracker API',
      description: 'Doc of api based on Next.js Route Handlers',
    },
    servers: [{ url: 'http://localhost:3000' }],
  });
}

export const openApiSpec = getOpenApiDocumentation();
