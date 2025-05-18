'use client';

import 'swagger-ui-react/swagger-ui.css';
import 'config/swagger/styles.css';

import SwaggerUI from 'swagger-ui-react';

import { openApiSpec } from 'config/swagger/swagger.config';

export function SwaggerPageContent() {
  return <SwaggerUI spec={openApiSpec} />;
}
