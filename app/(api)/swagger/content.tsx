'use client';

import 'swagger-ui-react/swagger-ui.css';
import '&/swagger/styles.css';

import SwaggerUI from 'swagger-ui-react';

import { openApiSpec } from '&/swagger/swagger.config';

export function SwaggerPageContent() {
  return <SwaggerUI spec={openApiSpec} />;
}
