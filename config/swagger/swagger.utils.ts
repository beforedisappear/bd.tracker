import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { type RouteConfig } from '@asteasolutions/zod-to-openapi';

export function registerPathWithBearer(
  registry: OpenAPIRegistry,
  bearerName: string,
  docFunction: (bearerName: string) => RouteConfig,
) {
  const routeConfig = docFunction(bearerName);
  registry.registerPath(routeConfig);
}
