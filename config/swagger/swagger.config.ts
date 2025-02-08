import { z } from 'zod';

import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';

import { PostAuthDoc } from '$/routeHandlers/auth/doc';
import { PostLoginDoc } from '$/routeHandlers/login/doc';
import { PostRefreshTokensDoc } from '$/routeHandlers/refreshTokens/doc';
import { PostLogoutDoc } from '$/routeHandlers/logout/doc';
import { GetProfileDoc } from '$/routeHandlers/profile/doc';

extendZodWithOpenApi(z);

const openAPIRegistry = new OpenAPIRegistry();

export const bearerAuth = openAPIRegistry.registerComponent(
  'securitySchemes',
  'bearerAuth',
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  },
);

// auth
openAPIRegistry.registerPath(PostAuthDoc);
openAPIRegistry.registerPath(PostLoginDoc);
openAPIRegistry.registerPath(PostRefreshTokensDoc);
openAPIRegistry.registerPath(PostLogoutDoc);

//profile
openAPIRegistry.registerPath(GetProfileDoc);

function getOpenApiDocumentation() {
  const generator = new OpenApiGeneratorV3(openAPIRegistry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '0.0.1',
      title: 'BD.tracker API',
      description: 'Doc of api based on Next.js Route Handlers',
    },
    servers: [{ url: process.env.NEXT_PUBLIC_API_URL! }],
  });
}

export const openApiSpec = getOpenApiDocumentation();
